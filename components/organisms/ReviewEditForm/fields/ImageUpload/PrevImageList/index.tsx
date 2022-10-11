import styled from '@emotion/styled';
import { Image, Modal } from 'antd';
import { SubmitData } from 'components/organisms/ReviewEditForm';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { PhotoProps } from 'types/model';
import { ValueOf } from 'types/utility';

interface PrevImageListProps {
  prevImageList: PhotoProps[];
  setPrevImageList: Dispatch<PhotoProps[]>;
  onValueChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const PrevImageList = ({ prevImageList, setPrevImageList, onValueChange }: PrevImageListProps) => {
  const [deletedImageList, setDeletedImageList] = useState<number[]>([]);
  const clickedImage = useRef<number>(0);
  const [isModalOn, setIsModalOn] = useState(false);

  const handleImageClick = (photoId: number) => {
    clickedImage.current = photoId;
    setIsModalOn(true);
  };

  const handleImageDelete = () => {
    const photoId = clickedImage.current;
    setDeletedImageList([...deletedImageList, photoId]);
    setPrevImageList(prevImageList.filter((image) => image.photoId !== photoId));
    setIsModalOn(false);
  };

  const handleModalCancel = () => {
    clickedImage.current = 0;
    setIsModalOn(false);
  };

  useEffect(() => {
    onValueChange('deletedPhotos', deletedImageList);
  }, [deletedImageList]);

  return (
    <>
      <PrevImageContainer>
        {prevImageList.map(({ photoId, path }) => (
          <Image
            key={photoId}
            src={path}
            alt="previous image"
            width={104}
            height={104}
            preview={false}
            onClick={() => handleImageClick(photoId)}
          />
        ))}
      </PrevImageContainer>
      <Modal
        title="이미지 삭제"
        visible={isModalOn}
        okText="삭제하기"
        onOk={handleImageDelete}
        cancelText="취소"
        onCancel={handleModalCancel}
      >
        <p>이 이미지를 삭제할까요?</p>
      </Modal>
    </>
  );
};

const PrevImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 104px);
  gap: 8px;
  margin-bottom: 8px;

  img {
    cursor: pointer;
  }
`;

export default PrevImageList;
