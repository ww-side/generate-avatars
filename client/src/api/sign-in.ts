import api from '@utils/axios-instance';
import { AuthDataType } from '@base/types/auth';

export async function signIn(data: AuthDataType) {
  return await api.post(`/auth/sign-in`, data);
}
