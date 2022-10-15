import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Image } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getBase64, validateImageFile } from 'utils';
import { PhotoProps } from 'types/model';
import PrevImageList from './PrevImageList';
import { FieldGetter } from '../..';

interface ImageUploadProps {
  limit: number;
  type: 'create' | 'update';
  prevData?: PhotoProps[];
  onFileUpload: (newFileList: UploadFile[]) => void;
}

const ImageUpload = forwardRef(
  ({ limit, type, prevData, onFileUpload }: ImageUploadProps, ref: ForwardedRef<FieldGetter>) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [prevImageList, setPrevImageList] = useState<PhotoProps[]>(prevData || []);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      onFileUpload(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handlePreviewCancel = () => {
      setPreviewVisible(false);
    };

    useEffect(() => {
      prevData && setPrevImageList(prevData);
    }, [prevData]);

    return (
      <>
        {type === 'update' && (
          <PrevImageList
            prevImageList={prevImageList}
            setPrevImageList={setPrevImageList}
            ref={ref}
          />
        )}
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={validateImageFile}
        >
          {fileList.length < limit - prevImageList.length ? uploadButton : null}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handlePreviewCancel}
        >
          <Image alt="preview image" style={{ width: '100%' }} src={previewImage} preview={false} />
        </Modal>
      </>
    );
  },
);

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
