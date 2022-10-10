import styled from '@emotion/styled';
import { Button, Form, message, UploadFile, Image, Modal } from 'antd';
import { reviewAPI } from 'apis';
import { useDebounce } from 'hooks';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, Dispatch } from 'react';
import { PhotoProps } from 'types/model';
import { ValueOf } from 'types/utility';
import { convertFilesToFormData, convertObjectToFormData, getErrorMessage } from 'utils';
import {
  ExhibitionSearchBar,
  DateInput,
  TitleInput,
  ContentTextArea,
  ImageUpload,
  IsPublicSwitch,
} from './fields';
import { MESSAGE_COMMON as ERROR_MESSAGE } from './utils/ErrorMessage';
import { MESSAGE, LABEL } from './utils/constants';

export interface SubmitData {
  [key: string]: string | number | boolean | number[];
}

const initialValueData: SubmitData = {
  exhibitionId: 0,
  exhibitionName: '',
  exhibitionThumbnail: '',
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

const initialErrorData = {
  exhibition: ERROR_MESSAGE.REQUIRED_VALUE,
  date: ERROR_MESSAGE.REQUIRED_VALUE,
  title: ERROR_MESSAGE.REQUIRED_VALUE,
  content: ERROR_MESSAGE.REQUIRED_VALUE,
};

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
  const submitData = useRef<SubmitData>({ ...initialValueData });
  const errorData = useRef({ ...initialErrorData });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [prevImages, setPrevImages] = useState<PhotoProps[]>([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clickedImage = useRef<number>(0);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  useEffect(() => {
    if (type === 'update') {
      submitData.current = {
        ...submitData.current,
        deletedPhotos: [],
      };
      prevData && setPrevImages(prevData.photos || []);
    }
  }, [type]);

  const handleValueChange = (key: string, value: ValueOf<SubmitData>) => {
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

  const handleErrorChange = (key: string, value: string) => {
    errorData.current = {
      ...errorData.current,
      [key]: value,
    };
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (isLoading) {
      return;
    }
    setWasSubmitted(true);
    const isValidated = Object.values(errorData.current).every((error) => !error);
    isValidated ? handleFinish() : message.error(MESSAGE.FORM_INVALID);
  };
  const [buttonRef] = useDebounce(handleSubmit, 300, null, 'click');

  const handleFinish = async () => {
    setIsLoading(true);
    const data = submitData.current;
    let formData = convertObjectToFormData('data', data);
    formData = convertFilesToFormData('files', files, formData);

    try {
      switch (type) {
        case 'create': {
          await reviewAPI.createReview(formData);
          message.success(MESSAGE.CREATE_SUCCESS);
          break;
        }
        case 'update': {
          await reviewAPI.updateReview(Number(router.query.id), formData);
          message.success(MESSAGE.UPDATE_SUCCESS);
          onMutation && onMutation(data, prevImages);
          break;
        }
        default: {
          throw new TypeError(MESSAGE.TYPE_INVALID);
        }
      }
      removeDraftReview && removeDraftReview();
      router.replace('/community');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleImageClick = (photoId: number) => {
    clickedImage.current = photoId;
    setIsModalOn(true);
  };

  const handleImageDelete = () => {
    const photoId = clickedImage.current;
    const { deletedPhotos } = submitData.current;
    deletedPhotos && handleValueChange('deletedPhotos', [...(deletedPhotos as number[]), photoId]);
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
        <FormItem label={LABEL.EXHIBITION}>
          <ExhibitionSearchBar
            type={type}
            prevData={
              prevData
                ? {
                    id: prevData.exhibitionId,
                    name: prevData.exhibitionName,
                    thumbnail: prevData.exhibitionThumbnail,
                  }
                : undefined
            }
            isPrevDataChanged={isPrevDataChanged}
            wasSubmitted={wasSubmitted}
            onValueChange={handleValueChange}
            onErrorChange={handleErrorChange}
          />
        </FormItem>
        <FormItem label={LABEL.DATE}>
          <DateInput
            prevDate={prevData?.date}
            wasSubmitted={wasSubmitted}
            onValueChange={handleValueChange}
            onErrorChange={handleErrorChange}
          />
        </FormItem>
        <FormItem label={LABEL.TITLE}>
          <TitleInput
            prevTitle={prevData?.title}
            wasSubmitted={wasSubmitted}
            onValueChange={handleValueChange}
            onErrorChange={handleErrorChange}
          />
        </FormItem>
        <FormItem label={LABEL.CONTENT}>
          <ContentTextArea
            prevContent={prevData?.content}
            wasSubmitted={wasSubmitted}
            onValueChange={handleValueChange}
            onErrorChange={handleErrorChange}
          />
        </FormItem>
        <FormItem label={LABEL.PHOTOS}>
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
        <FormItem label={LABEL.IS_PUBLIC}>
          <IsPublicSwitch prevIsPublic={prevData?.isPublic} onValueChange={handleValueChange} />
        </FormItem>

        <SubmitButton type="primary" ref={buttonRef}>
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
