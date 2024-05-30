import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '@pages/auth/sign-in-page';
import SignUpPage from '@pages/auth/sign-up-page';
import AppPage from '@pages/app-page';
import GalleryPage from '@pages/gallery-page';
import RootLayout from '@components/layouts/root-layout';
import { routeLoader } from '@utils/router-loader';
import { routes } from '@config/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AppPage />,
        loader: async () => {
          return routeLoader(routes.workspace);
        },
      },
      {
        path: '/gallery',
        element: <GalleryPage />,
        loader: async () => {
          return routeLoader(routes.gallery);
        },
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
        loader: async () => {
          return routeLoader(routes.auth.signIn);
        },
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
        loader: async () => {
          return routeLoader(routes.auth.signUp);
        },
      },
    ],
  },
]);
