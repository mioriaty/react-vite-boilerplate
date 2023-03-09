import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface Configure {
  configure: AxiosRequestConfig;
  setAccessToken: () => string;
  setRefreshToken: () => string;
}

const { CancelToken } = axios;

export default class ConfigureAxios {
  private axiosInstance: AxiosInstance;
  private setAccessToken: () => string;
  private setRefreshToken: () => string;

  constructor({ configure, setAccessToken, setRefreshToken }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.setAccessToken = setAccessToken;
    this.setRefreshToken = setRefreshToken;
  }

  public create = (cancel = '', setConfig?: () => AxiosRequestConfig) => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const config = setConfig?.();
        const request = this.axiosInstance({
          ...requestConfig,
          ...(config ?? {}),
          cancelToken: source.token,
        });
        if (cancel) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}
