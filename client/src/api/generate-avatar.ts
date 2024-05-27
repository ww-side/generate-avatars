import api from '@utils/axios-instance';
import { getToken } from '@utils/get-token';

export default async function generateAvatar(formData: any) {
  const token = getToken();

  return await api.post('/generate-avatar/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
}
