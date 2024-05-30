import { Flex, message } from 'antd';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import SectionItem from '@components/ui/section-item';
import { imgLinkAtom } from '@store/workspace';
import { saveAvatar } from '@api/save-avatar';
import { httpErrorHandler } from '@utils/http-error-handler';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import st from './workspace.styles.module.scss';

export default function GeneratedAvatar() {
  const imgLink = useAtomValue(imgLinkAtom);

  const handleSaveAvatar = async () => {
    try {
      await saveAvatar(imgLink);
      await message.success(
        'The image has been successfully saved to the gallery',
      );
    } catch (e) {
      await httpErrorHandler(e);
    }
  };

  return (
    <>
      <SectionItem
        title="Your avatar"
        description="Save your avatar so you don't lose it!"
        isBorderBottom={false}
      >
        {imgLink && (
          <Flex vertical align="center" gap="small">
            <img src={imgLink} alt="generated-img" width={300} height={300} />
            <Flex align="center" gap="middle">
              <SaveOutlined
                className={st.actionIcon}
                onClick={handleSaveAvatar}
              />
              <Link className={st.actionIcon} to={imgLink} target="_blank">
                <DownloadOutlined />
              </Link>
            </Flex>
          </Flex>
        )}
      </SectionItem>
    </>
  );
}
