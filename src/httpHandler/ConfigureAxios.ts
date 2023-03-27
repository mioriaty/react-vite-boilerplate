import { storage } from '@app/utils/storage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface Configure {
  configure: AxiosRequestConfig;
  setAccessToken: () => string;
  setRefreshToken: () => string;
}

const { CancelToken } = axios;

interface AccessTokenParams {
  setCondition: (config: AxiosRequestConfig) => boolean;
}

type Success<ResponseDataT> = (res: AxiosResponse<ResponseDataT>, originalRequest: AxiosRequestConfig) => void;

type Failure = (error: AxiosError) => void;

interface Config<ResponseDataT, AxiosDataReturnT> {
  url: string;
  setRefreshCondition: (error: AxiosError) => boolean;
  axiosData?: (refreshToken: string) => AxiosDataReturnT;
  success: Success<ResponseDataT>;
  failure: Failure;
}

export default class ConfigureAxios {
  private axiosInstance: AxiosInstance;
  private setAccessToken: () => string;
  private setRefreshToken: () => string;
  private refreshTokenRequest: null | Promise<AxiosResponse<any, any> | undefined>;

  constructor({ configure, setAccessToken, setRefreshToken }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.setAccessToken = setAccessToken;
    this.setRefreshToken = setRefreshToken;
    this.refreshTokenRequest = null;
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

  public accessToken({ setCondition }: AccessTokenParams) {
    this.axiosInstance.interceptors.request.use(
      config => {
        if (!config.url) {
          return config;
        }
        const accessToken = this.setAccessToken();
        if (setCondition(config) && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  private handleRefreshToken = async <ResponseDataT, AxiosDataReturnT>(config: Config<ResponseDataT, AxiosDataReturnT>, error: AxiosError) => {
    const { url, axiosData, success, failure } = config;
    try {
      const refreshToken = this.setRefreshToken();
      const accessToken = this.setAccessToken();
      const res = await this.axiosInstance.post(url, axiosData?.(refreshToken));
      success(res as AxiosResponse, error.config as AxiosRequestConfig);
      return this.axiosInstance({
        ...(error.config as AxiosRequestConfig),
        headers: { ...(error.config as AxiosRequestConfig).headers, Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      failure(error as AxiosError);
      throw new Error(error as any);
    } finally {
      // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
      setTimeout(() => {
        this.refreshTokenRequest = null;
      }, 10000);
    }
  };

  public refreshToken = <ResponseDataT = any, AxiosDataReturnT = any>(config: Config<ResponseDataT, AxiosDataReturnT>) => {
    this.axiosInstance.interceptors.response.use(
      config => config,
      (error: AxiosError<ResponseDataT, AxiosDataReturnT>) => {
        if (config.setRefreshCondition(error)) {
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (config.url !== error.config?.url) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest ? this.refreshTokenRequest : this.handleRefreshToken(config, error);
            return this.refreshTokenRequest;
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          storage.clear();
          console.error(error);
        }

        return Promise.reject(error);
      },
    );
  };
}
