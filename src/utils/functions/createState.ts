import { storage } from '@app/utils/storage';

type Listener<S = any> = (state: S) => void;
type CompareFunc<S = any> = (prevState: S, state: S) => boolean;

interface Config {
  useLocalStorage: boolean;
  stateName: string;
}

type UnSubscribe = () => void;

interface ICreateState<S = any> {
  getState(): S;
  setState<K extends keyof S>(state: S | Pick<S, K> | ((prevState: Readonly<S>) => S | Pick<S, K>), actionName: string): void;
  subscribe(listener: Listener<S>): UnSubscribe;
  shouldUpdate(compareFunc: CompareFunc<S>): void;
}

const defaultConfig: Config = {
  stateName: '@state',
  useLocalStorage: false,
};

class CreateState<S = any> implements ICreateState<S> {
  private state: S;
  private prevState!: S;
  private listeners: Listener<S>[];
  private config: Config;
  private compareFnc!: CompareFunc<S>;

  constructor(initState: S, config = defaultConfig) {
    this.state = initState;
    this.config = config;
    this.listeners = [];
    if (!config.useLocalStorage) {
      storage.removeItem(config.stateName);
    }

    this.updateStateFormLocalStorage();
  }

  private updateStateFormLocalStorage() {
    const { stateName, useLocalStorage } = this.config;
    const state = storage.getItem(stateName);
    if (useLocalStorage && state) {
      try {
        this.state = JSON.parse(state);
      } catch {
        this.state = state as S;
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }

  private handleCompare() {
    if (!this.compareFnc) {
      return this.notify();
    }
    const isUpdate = this.compareFnc(this.prevState, this.state);
    if (isUpdate) {
      this.notify();
    }
  }

  getState(): S {
    return this.state;
  }

  setState<K extends keyof S>(state: S | Pick<S, K> | ((prevState: Readonly<S>) => S | Pick<S, K>)): void {
    const { stateName, useLocalStorage } = this.config;
    this.prevState = this.state;
    if (typeof state === 'function') {
      this.state = (state as (prevState: Readonly<S>) => S | Pick<S, K>)(this.prevState) as S;
    } else {
      this.state = state as S;
    }
    if (useLocalStorage) {
      storage.setItem(stateName, JSON.stringify(this.setState));
    }
    this.handleCompare();
  }

  subscribe(listener: Listener<S>): UnSubscribe {
    this.updateStateFormLocalStorage();
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(_listener => _listener !== listener);
    };
  }
  shouldUpdate(compareFunc: CompareFunc<S>): void {
    this.compareFnc = compareFunc;
  }
}

export function createState<S>(initState: S, config = defaultConfig) {
  return new CreateState(initState, config);
}
