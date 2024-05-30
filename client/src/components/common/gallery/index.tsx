import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Flex, message } from 'antd';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import getSavedAvatars from '@api/get-saved-avatars';
import deleteSavedAvatar from '@api/delete-saved-avatar';
import { httpErrorHandler } from '@utils/http-error-handler';
import type { savedAvatarsType } from '@base/types/avatar';
import st from './gallery.module.scss';

export default function Gallery() {
  const [data, setData] = useState<savedAvatarsType[]>([]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await getSavedAvatars();
      setData(res.data);
    };

    fetchData();
  }, []);

  const handleDeleteAvatar = (id: string) => async () => {
    try {
      await deleteSavedAvatar(id);
      message.success(`The avatar ${id} was successfully deleted`);
      setData(prevState => prevState.filter(item => item._id !== id));
    } catch (e) {
      await httpErrorHandler(e);
    }
  };

  return (
    <Flex wrap>
      {data.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        data.map(item => (
          <Flex vertical gap="middle" align="center" key={item._id}>
            <img src={item.img} alt={item._id} width={200} height={200} />
            <Flex gap="large" align="center">
              <Link to={item.img} target="_blank">
                <DownloadOutlined className={st.actionIcon} />
              </Link>
              <DeleteOutlined
                className={st.actionIcon}
                onClick={handleDeleteAvatar(item._id)}
              />
            </Flex>
          </Flex>
        ))
      )}
    </Flex>
  );
}
