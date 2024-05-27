import api from '@utils/axios-instance';
import { getToken } from '@utils/get-token';

export default async function deleteSavedAvatar(id: string) {
  const token = getToken();

  return await api.delete(`/delete-avatar/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
