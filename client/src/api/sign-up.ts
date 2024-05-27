import api from '@utils/axios-instance';
import { AuthDataType } from '@base/types/auth';

export async function signUp(data: AuthDataType) {
  return await api.post(`/auth/sign-up`, data);
}
