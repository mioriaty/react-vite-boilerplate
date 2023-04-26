import { ErrorPage } from '@app/pages/ErrorPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePageLazy, IframePageLazy } from './Lazies';
import { AppPages } from './types';

const pages: AppPages[] = [
  {
    path: '/',
    element: <HomePageLazy />,
  },
  {
    path: '/iframe',
    element: <IframePageLazy />,
  },
];

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {pages.map(({ path, element }) => (
          <Route key={path} path={path} element={element} errorElement={<ErrorPage />} />
        ))}
      </Routes>
    </Router>
  );
};
