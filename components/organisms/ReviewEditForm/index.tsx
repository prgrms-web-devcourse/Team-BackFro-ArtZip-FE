import styled from '@emotion/styled';
import { Button, Form, message, UploadFile } from 'antd';
import { reviewAPI } from 'apis';
import { useAutoSaveReview, useDebounce } from 'hooks';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { PhotoProps } from 'types/model';
import { convertFilesToFormData, convertObjectToFormData, getErrorMessage } from 'utils';
import {
  ExhibitionSearchBar,
  DateInput,
  TitleInput,
  ContentTextArea,
  ImageUpload,
  IsPublicSwitch,
} from './fields';
import { SUBMIT_MESSAGE, LABEL } from './utils/constants';

export type FieldValue = string | number | boolean | number[];
export type FieldError = string;

export interface FieldGetter {
  getFieldValue: () => {
    [key: string]: FieldValue;
  };
  getFieldError: () => {
    [key: string]: FieldError;
  };
}

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
}
const ReviewEditForm = ({ type, prevData, isPrevDataChanged }: ReviewEditFormProps) => {
  const formRef = useRef(null);
  const exhibitionRef = useRef<FieldGetter>(null);
  const titleRef = useRef<FieldGetter>(null);
  const contentRef = useRef<FieldGetter>(null);
  const dateRef = useRef<FieldGetter>(null);
  const isPublicRef = useRef<FieldGetter>(null);
  const deletedPhotosRef = useRef<FieldGetter>(null);
  const fields = [exhibitionRef, titleRef, contentRef, dateRef, isPublicRef, deletedPhotosRef];
  const uploadedFileList = useRef<UploadFile[]>([]);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setStoredReview, removeStoredReview } = useAutoSaveReview();

  const getFieldValues = () => {
    return fields.reduce((acc, field) => {
      if (field.current) {
        const value = field.current.getFieldValue();
        Object.assign(acc, value);
      }
      return acc;
    }, {});
  };

  const getFieldErrors = () => {
    return fields.reduce((acc, field) => {
      if (field.current) {
        const error = field.current.getFieldError();
        Object.assign(acc, error);
      }
      return acc;
    }, {});
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
    const fieldErrors = Object.values(getFieldErrors());
    const isValidated = fieldErrors.every((error) => !error);
    isValidated ? handleFinish() : message.error(SUBMIT_MESSAGE.FORM_INVALID);
  };
  const [buttonRef] = useDebounce(handleSubmit, 300, null, 'click');

  const handleFinish = async () => {
    setIsLoading(true);
    const fieldValues = getFieldValues();
    const files = uploadedFileList.current;
    const formData = convertFilesToFormData(
      'files',
      files,
      convertObjectToFormData('data', fieldValues),
    );
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
      removeStoredReview();
      router.replace('/community');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (type === 'create') {
      timer = setInterval(() => {
        const fieldValues = getFieldValues();
        setStoredReview({
          ...fieldValues,
        });
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log(formRef);

  return (
    <EditForm layout="vertical" ref={formRef}>
      <FormItem label={LABEL.EXHIBITION} htmlFor={LABEL.EXHIBITION}>
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
          ref={exhibitionRef}
        />
      </FormItem>
      <FormItem label={LABEL.DATE} htmlFor={LABEL.DATE}>
        <DateInput prevDate={prevData?.date} wasSubmitted={wasSubmitted} ref={dateRef} />
      </FormItem>
      <FormItem label={LABEL.TITLE} htmlFor={LABEL.TITLE}>
        <TitleInput prevTitle={prevData?.title} wasSubmitted={wasSubmitted} ref={titleRef} />
      </FormItem>
      <FormItem label={LABEL.CONTENT} htmlFor={LABEL.CONTENT}>
        <ContentTextArea
          prevContent={prevData?.content}
          wasSubmitted={wasSubmitted}
          ref={contentRef}
        />
      </FormItem>
      <FormItem label={LABEL.PHOTOS} htmlFor={LABEL.PHOTOS}>
        <ImageUpload
          type={type}
          limit={9}
          prevData={prevData?.photos}
          onFileUpload={handleFileUpload}
          ref={deletedPhotosRef}
        />
      </FormItem>
      <FormItem label={LABEL.IS_PUBLIC} htmlFor={LABEL.IS_PUBLIC}>
        <IsPublicSwitch prevIsPublic={prevData?.isPublic} ref={isPublicRef} />
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
