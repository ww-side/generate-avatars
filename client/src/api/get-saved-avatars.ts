import api from '@utils/axios-instance';
import { getToken } from '@utils/get-token';

export default async function getSavedAvatars() {
  const token = getToken();

  return await api.get(`/get-avatars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
