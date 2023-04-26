import { lazy } from 'react';

export const HomePageLazy = lazy(() => import('@app/pages/HomePage'));

export const IframePageLazy = lazy(() => import('@app/pages/IframePage'));
