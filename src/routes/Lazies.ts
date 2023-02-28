import { lazy } from 'react';

export const HomePageLazy = lazy(() => import('@app/containers/HomePage'));

export const IframePageLazy = lazy(() => import('@app/containers/IframePage'));
