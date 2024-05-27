import api from '@utils/axios-instance';
import { getToken } from '@utils/get-token';

export async function saveAvatar(link: string) {
  const token = getToken();

  return await api.post(
    `/save-avatar`,
    { link },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}
