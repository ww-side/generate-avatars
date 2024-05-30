import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Flex, message, Spin, Typography, Upload } from 'antd';
import SectionItem from '@components/ui/section-item';
import generateAvatar from '@api/generate-avatar';
import { imgLinkAtom, styleAtom } from '@store/workspace';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import st from '@components/common/workspace/workspace.module.scss';

export default function UploadZone() {
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const selectedStyle = useAtomValue(styleAtom);
  const setImgLink = useSetAtom(imgLinkAtom);

  const customRequest = async (options: any) => {
    setIsUpload(false);

    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append('style', selectedStyle);
    formData.append('photo', file);

    try {
      const res = await generateAvatar(formData);
      setIsUpload(true);
      onSuccess(res.data);
    } catch (e) {
      onError(e);
    }
  };

  const onChangeUpload = async (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      await message.success(`${info.file.name} file uploaded successfully`);

      if (info.file.response) {
        setImgLink(info.file.response.url);
      }
    }

    if (info.file.status === 'error') {
      await message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <SectionItem title="Image" description="Your avatar">
      <Upload
        name="file"
        customRequest={customRequest}
        onChange={onChangeUpload}
        listType="picture-circle"
        showUploadList={false}
      >
        <Flex className={st.upload} gap="small" vertical align="center">
          {isUpload ? (
            <>
              <UploadOutlined className={st.icon} />
              <Typography.Paragraph>Click to Upload</Typography.Paragraph>
            </>
          ) : (
            <Spin tip="Loading" />
          )}
        </Flex>
      </Upload>
    </SectionItem>
  );
}
