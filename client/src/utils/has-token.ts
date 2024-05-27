import { getCookie } from '@utils/get-cookie';

export function hasToken() {
  const token = getCookie('token');

  return !!token;
}
