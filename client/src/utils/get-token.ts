import { getCookie } from '@utils/get-cookie';

export function getToken() {
  return getCookie('token');
}
