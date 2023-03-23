import { storage } from '@app/utils/storage';

import ConfigureAxios from './ConfigureAxios';

interface RefreshTokenResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

interface AxiosData {
  refresh_token: string;
}

const axiosConfig = new ConfigureAxios({
  configure: {
    baseURL: 'http://localhost:4000/',
    method: 'GET',
    timeout: 10000,
  },
  setAccessToken() {
    const access_token = storage.getItem('access_token') ?? '';
    return access_token;
  },
  setRefreshToken() {
    const refresh_token = storage.getItem('refresh_token') ?? '';
    return refresh_token;
  },
});

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

axiosConfig.refreshToken<RefreshTokenResponse, AxiosData>({
  url: 'refresh-token',
  setRefreshCondition(error) {
    return error.response?.status === 401;
  },
  success(res) {
    storage.setItem('access_token', res.data.data.access_token);
  },
  failure(error) {
    storage.clear();
    throw error.response;
  },
  axiosData: refreshToken => {
    return { refresh_token: refreshToken };
  },
});

export const http = axiosConfig.create('');
