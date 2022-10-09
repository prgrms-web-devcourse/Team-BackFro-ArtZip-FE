import styled from '@emotion/styled';
import { Button, Form, message, UploadFile, Image, Modal } from 'antd';
import { reviewAPI } from 'apis';
import { useDebounce } from 'hooks';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, Dispatch } from 'react';
import { PhotoProps } from 'types/model';
import { ValueOf } from 'types/utility';
import {
  convertFilesToFormData,
  convertObjectToFormData,
  getErrorMessage,
  validateReviewEditForm,
} from 'utils';
import {
  ExhibitionSearchBar,
  DateInput,
  TitleInput,
  ContentTextArea,
  ImageUpload,
  IsPublicSwitch,
} from './fields';

export interface SubmitData {
  [key: string]: string | number | boolean | number[];
}

const initialData: SubmitData = {
  exhibitionId: 0,
  date: '',
  title: '',
  content: '',
  isPublic: true,
};
Object.freeze(initialData);

interface ReviewEditFormProps {
  type: 'create' | 'update';
  prevData?: {
    exhibitionId: number;
    exhibitionName: string;
    exhibitionThumbnail: string;
    date: string;
    title: string;
    content: string;
    isPublic: boolean;
    photos?: PhotoProps[];
  };
  isPrevDataChanged?: boolean;
  onMutation?: (submitData: SubmitData, prevImages: PhotoProps[]) => void;
  setDraftReview?: Dispatch<SubmitData>;
  removeDraftReview?: () => void;
}

const ReviewEditForm = ({
  type,
  prevData,
  isPrevDataChanged,
  onMutation,
  setDraftReview,
  removeDraftReview,
}: ReviewEditFormProps) => {
  const submitData = useRef<SubmitData>({ ...initialData });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevImages, setPrevImages] = useState<PhotoProps[]>([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const clickedImage = useRef<number>(0);
  const router = useRouter();
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    if (prevData) {
      submitData.current = {
        exhibitionId: prevData.exhibitionId,
        exhibitionName: prevData.exhibitionName,
        exhibitionThumbnail: prevData.exhibitionThumbnail,
        date: prevData.date,
        title: prevData.title,
        content: prevData.content,
        isPublic: prevData.isPublic,
      };

      if (type === 'update') {
        submitData.current = {
          ...submitData.current,
          deletedPhotos: [],
        };
        setPrevImages(prevData.photos || []);
      }
    }
  }, [isPrevDataChanged, type]);

  const handleChange = (key: string, value: ValueOf<SubmitData>) => {
    submitData.current = {
      ...submitData.current,
      [key]: value,
    };

    if (type === 'create' && setDraftReview && submitData.current.exhibitionId) {
      timerId.current && clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setDraftReview({
          ...submitData.current,
        });
      }, 1000);
    }
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (isLoading) {
      return;
    }
    setWasSubmitted(true);

    /*
    const data = submitData.current;
    if (validateReviewEditForm(data)) {
      setIsLoading(true);
      let formData = convertObjectToFormData('data', data);
      formData = convertFilesToFormData('files', files, formData);
      try {
        switch (type) {
          case 'create': {
            await reviewAPI.createReview(formData);
            message.success('후기 작성이 완료되었습니다.');
            break;
          }
          case 'update': {
            await reviewAPI.updateReview(Number(router.query.id), formData);
            message.success('후기 수정이 완료되었습니다.');
            onMutation && onMutation(data, prevImages);
            break;
          }
          default: {
            throw new TypeError('type의 값이 유효하지 않습니다.');
          }
        }
        removeDraftReview && removeDraftReview();
        router.replace('/community');
      } catch (error) {
        message.error(getErrorMessage(error));
        console.error(error);
      }
      setIsLoading(false);
    }
    */
  };
  const [debounceRef] = useDebounce(handleSubmit, 300, null, 'click');

  const handleImageClick = (photoId: number) => {
    clickedImage.current = photoId;
    setIsModalOn(true);
  };

  const handleImageDelete = () => {
    const photoId = clickedImage.current;
    const { deletedPhotos } = submitData.current;
    deletedPhotos && handleChange('deletedPhotos', [...(deletedPhotos as number[]), photoId]);
    setPrevImages(prevImages.filter((image) => image.photoId !== photoId));
    setIsModalOn(false);
  };

  const handleModalCancel = () => {
    clickedImage.current = 0;
    setIsModalOn(false);
  };

  return (
    <>
      <EditForm layout="vertical">
        <FormItem label="다녀 온 전시회">
          <ExhibitionSearchBar
            type={type}
            prevData={
              prevData
                ? {
                    name: prevData.exhibitionName,
                    thumbnail: prevData.exhibitionThumbnail,
                  }
                : undefined
            }
            isPrevDataChanged={isPrevDataChanged}
            wasSubmitted={wasSubmitted}
            onExhibitionChange={handleChange}
          />
        </FormItem>
        <FormItem label="다녀 온 날짜">
          <DateInput
            prevDate={prevData?.date}
            wasSubmitted={wasSubmitted}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="제목">
          <TitleInput
            prevTitle={prevData?.title}
            wasSubmitted={wasSubmitted}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="내용">
          <ContentTextArea
            prevContent={prevData?.content}
            wasSubmitted={wasSubmitted}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="사진">
          {type === 'update' && (
            <PrevImageContainer>
              {prevImages.map(({ photoId, path }) => (
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
          )}
          <ImageUpload fileList={files} setFileList={setFiles} limit={9 - prevImages.length} />
        </FormItem>
        <FormItem label="공개 여부">
          <IsPublicSwitch prevIsPublic={prevData?.isPublic} handleChange={handleChange} />
        </FormItem>

        <SubmitButton type="primary" ref={debounceRef}>
          작성완료
        </SubmitButton>
      </EditForm>
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

const EditForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 50px 0;

  label {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const FormItem = styled(Form.Item)`
  label[title='사진']::after {
    content: '(optional)';
    display: inline;
    color: ${({ theme }) => theme.color.font.dark};
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 2px;
    margin-left: 4px;
  }
`;

const PrevImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 104px);
  gap: 8px;
  margin-bottom: 8px;

  img {
    cursor: pointer;
  }
`;

const SubmitButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  margin: 30px auto 0;
  font-size: 1.8rem;
`;

export default ReviewEditForm;
