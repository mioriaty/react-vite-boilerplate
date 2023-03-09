let checked = false;
const storageAvailable = () => {
  if (!checked) {
    checked = true;
    const item = '@localStorageCheck';
    try {
      window.localStorage.setItem(item, item);
      window.localStorage.removeItem(item);
      return true;
    } catch {
      return false;
    }
  }
};

const memoryStorage = new Map<string, string>();
const createStorage = (): Storage => {
  if (storageAvailable()) {
    return window.localStorage;
  } else {
    return {
      getItem(key) {
        return memoryStorage.get(key) ?? null;
      },
      setItem(key, value) {
        memoryStorage.set(key, value);
      },
      removeItem(key) {
        memoryStorage.delete(key);
      },
      clear() {
        memoryStorage.clear();
      },
      key() {
        return null;
      },
      length: 0,
    };
  }
};

export const storage = createStorage();
