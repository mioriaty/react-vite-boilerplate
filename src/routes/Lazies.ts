import { lazy } from 'react';

export const HomePageLazy = lazy(() => import(/* webpackChunkName: "HomePage", webpackPrefetch: true */ '@app/containers/HomePage'));

export const IframePageLazy = lazy(() => import(/* webpackChunkName: "IframePage", webpackPrefetch: true */ '@app/containers/IframePage'));
