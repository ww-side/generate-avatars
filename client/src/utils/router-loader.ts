import { redirect } from 'react-router-dom';
import { hasToken } from '@utils/has-token';
import { restrictedPaths } from '@config/restricted-paths';

export async function routeLoader(path: string) {
  const isAuthorized = hasToken();

  if ((path === '/sign-in' || path === '/sign-up') && isAuthorized) {
    throw redirect('/');
  }

  if (restrictedPaths.includes(path) && !isAuthorized) {
    throw redirect('/sign-in');
  }

  return null;
}
