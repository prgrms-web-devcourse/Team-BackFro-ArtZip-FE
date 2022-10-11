import styled from '@emotion/styled';
import { Button, Form, message, UploadFile } from 'antd';
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
import { SUBMIT_MESSAGE, LABEL } from './utils/constants';

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
  setDraftReview?: Dispatch<SubmitData>;
  removeDraftReview?: () => void;
}

const ReviewEditForm = ({
  type,
  prevData,
  isPrevDataChanged,
  setDraftReview,
  removeDraftReview,
}: ReviewEditFormProps) => {
  const submitData = useRef<SubmitData>({ ...initialValueData });
  const errorData = useRef({ ...initialErrorData });
  const uploadedFileList = useRef<UploadFile[]>([]);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  useEffect(() => {
    if (type === 'update') {
      submitData.current = {
        ...submitData.current,
        deletedPhotos: [],
      };
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

  const handleFileUpload = (newFileList: UploadFile[]) => {
    uploadedFileList.current = [...newFileList];
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (isLoading) {
      return;
    }
    setWasSubmitted(true);
    const isValidated = Object.values(errorData.current).every((error) => !error);
    isValidated ? handleFinish() : message.error(SUBMIT_MESSAGE.FORM_INVALID);
  };
  const [buttonRef] = useDebounce(handleSubmit, 300, null, 'click');

  const handleFinish = async () => {
    setIsLoading(true);
    const data = submitData.current;
    const files = uploadedFileList.current;
    let formData = convertObjectToFormData('data', data);
    formData = convertFilesToFormData('files', files, formData);

    try {
      switch (type) {
        case 'create': {
          await reviewAPI.createReview(formData);
          message.success(SUBMIT_MESSAGE.CREATE_SUCCESS);
          break;
        }
        case 'update': {
          await reviewAPI.updateReview(Number(router.query.id), formData);
          message.success(SUBMIT_MESSAGE.UPDATE_SUCCESS);
          break;
        }
        default: {
          throw new TypeError(SUBMIT_MESSAGE.TYPE_INVALID);
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

  return (
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
        <ImageUpload
          type={type}
          limit={9}
          prevData={prevData?.photos}
          onFileUpload={handleFileUpload}
          onValueChange={handleValueChange}
        />
      </FormItem>
      <FormItem label={LABEL.IS_PUBLIC}>
        <IsPublicSwitch prevIsPublic={prevData?.isPublic} onValueChange={handleValueChange} />
      </FormItem>

      <SubmitButton type="primary" ref={buttonRef}>
        작성완료
      </SubmitButton>
    </EditForm>
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

const SubmitButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  margin: 30px auto 0;
  font-size: 1.8rem;
`;

export default ReviewEditForm;
