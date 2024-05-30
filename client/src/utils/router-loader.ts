import { redirect } from 'react-router-dom';
import { hasToken } from '@utils/has-token';
import { restrictedPaths } from '@config/restricted-paths';
import { routes } from '@config/routes';

export async function routeLoader(path: string) {
  const isAuthorized = hasToken();

  if (
    (path === routes.auth.signIn || path === routes.auth.signUp) &&
    isAuthorized
  ) {
    throw redirect('/');
  }

  if (restrictedPaths.includes(path) && !isAuthorized) {
    throw redirect(routes.auth.signIn);
  }

  return null;
}
