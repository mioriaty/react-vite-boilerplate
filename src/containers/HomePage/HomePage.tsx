import { Button } from '@app/components/Button';
import { http } from '@app/httpHandler';
import { storage } from '@app/utils/storage';
import { AxiosResponse } from 'axios';
import { FC } from 'react';

import { DemoAutocomplete, DemoModal, DemoModalStep, DemoPostmessage, DemoTodo, DemoUseTransition, DemoWebWorker } from '../DemoFeatures';

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export const HomePage: FC = () => {
  const fetchProducts = async () => {
    await http.request({
      url: 'products',
    });
  };

  const fetchProfiles = async () => {
    await http.request({
      url: 'profile',
    });
  };

  const handleLogin = async () => {
    try {
      const response: AxiosResponse<LoginResponse> = await http.request({
        url: 'login',
        method: 'post',
        data: {
          username: 'admin',
          password: 'admin',
        },
      });
      storage.setItem('access_token', response.data.data.access_token);
      storage.setItem('refresh_token', response.data.data.refresh_token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefreshToken = async () => {
    const refresh_token = storage.getItem('refresh_token');
    const response: AxiosResponse<LoginResponse> = await http.request({
      url: 'refresh-token',
      method: 'post',
      data: {
        refresh_token,
      },
    });
    storage.setItem('access_token', response.data.data.access_token);
  };

  const fetchAll = async () => {
    await fetchProducts();
    await fetchProfiles();
  };

  return (
    <div css={{ padding: '10px' }}>
      <div css={{ display: 'flex', columnGap: '10px' }}>
        <Button size="extra-small" onClick={handleLogin}>
          Login
        </Button>
        <Button size="extra-small" onClick={handleRefreshToken}>
          Refresh token
        </Button>

        <Button size="extra-small" onClick={fetchProducts}>
          fetch products
        </Button>
        <Button size="extra-small" onClick={fetchProfiles}>
          fetch profiles
        </Button>
        <Button size="extra-small" onClick={fetchAll}>
          fetch products and profiles
        </Button>
      </div>
      <DemoTodo />
      <hr />
      <hr />
      <DemoModalStep />
      <hr />
      <hr />
      <DemoAutocomplete />
      <hr />
      <hr />
      <DemoModal />
      <hr />
      <hr />
      <DemoWebWorker />
      <hr />
      <hr />
      <DemoPostmessage />
      <hr />
      <hr />
      <DemoUseTransition />
    </div>
  );
};
