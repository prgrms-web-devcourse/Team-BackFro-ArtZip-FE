import { ChangeEvent, useCallback, useRef, useState, memo } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Button, message, Form, UploadFile } from 'antd';
import { Banner } from 'components/molecules';
import { ExhibitionSearchBar, ImageUpload } from 'components/organisms';
import {
  convertObjectToFormData,
  convertFilesToFormData,
  getErrorMessage,
  validateReviewEditForm,
} from 'utils';
import { useRouter } from 'next/router';
import { useCheckAuth, useDebounce } from 'hooks';
import { Spinner } from 'components/atoms';
import moment from 'moment';

export interface SubmitData {
  exhibitionId: number;
  date: string;
  title: string;
  content: string;
  isPublic: boolean;
  deletedPhotos?: number[];
}

const initialData: SubmitData = {
  exhibitionId: 0,
  date: '',
  title: '',
  content: '',
  isPublic: true,
};
Object.freeze(initialData);

const ReviewCreatePage = () => {
  const router = useRouter();
  const { query } = router;
  const submitData = useRef<SubmitData>({ ...initialData });

  const [exhibitionId, setExhibitionId] = useState<number>(Number(query.exhibitionId) || 0);
  const [date, setDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (query.exhibitionId) {
  //     submitData.current['exhibitionId'] = Number(query.exhibitionId);
  //   }
  // }, []);

  const handleDateChange = useCallback((value: moment.Moment | null) => {
    if (value) {
      setDate(value.format('YYYY-MM-DD'));
    }
  }, []);

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleIsPublicChange = useCallback((checked: boolean) => {
    setIsPublic(checked);
  }, []);

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    console.log('결과:', exhibitionId, date, title, content, isPublic);
    if (isChecking) {
      return;
    }

    if (!isLoading && validateReviewEditForm(submitData.current)) {
      setIsLoading(true);
      let formData = convertObjectToFormData('data', submitData.current);
      formData = convertFilesToFormData('files', files, formData);
      try {
        await reviewAPI.createReview(formData);
        message.success('후기 작성이 완료되었습니다.');
        router.replace('/community');
      } catch (error) {
        message.error(getErrorMessage(error));
        console.error(error);
      }
      setIsLoading(false);
    }
  };
  const [debounceRef] = useDebounce(handleSubmit, 300, null, 'click');

  const [isChecking] = useCheckAuth();
  return isChecking ? (
    <Spinner />
  ) : (
    <>
      <Banner
        subtitle="Art.zip 후기 작성"
        title="전시회 다녀오셨나요?"
        content="소중한 경험을 후기로 작성하세요!"
      />
      <Section>
        <ReviewEditForm layout="vertical">
          <FormItem label="다녀 온 전시회">
            <ExhibitionSearchBar query={query} />
          </FormItem>
          <FormItem label="다녀 온 날짜">
            <DateInput
              onChange={handleDateChange}
            />
          </FormItem>
          <FormItem label="제목">
            <Input
              placeholder="제목을 입력해주세요"
              showCount
              maxLength={30}
              value={title}
              onChange={handleTitleChange}
            />
          </FormItem>
          <FormItem label="내용">
            <TextArea
              placeholder="내용을 입력해주세요(1000자 이하)"
              autoSize
              onChange={handleContentChange}
            />
          </FormItem>
          <FormItem label="사진">
            <ImageUpload fileList={files} setFileList={setFiles} limit={9} />
          </FormItem>
          <FormItem label="공개 여부">
            <ToggleSwitch defaultChecked onChange={handleIsPublicChange} />
            {isPublic ? '전체 공개' : '비공개'}
          </FormItem>

          <SubmitButton type="primary" ref={debounceRef}>
            작성완료
          </SubmitButton>
        </ReviewEditForm>
      </Section>
    </>
  );
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

const ReviewEditForm = styled(Form)`
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

const DateInput = memo(styled(DatePicker)`
  width: 200px;

  & > input {
    font-size: 1.6rem;
  }
`);

const TextArea = memo(styled(Input.TextArea)``);

const ToggleSwitch = styled(Switch)`
  width: 54px;
  margin-right: 14px;
`;

const SubmitButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  margin: 30px auto 0;
  font-size: 1.8rem;
`;

export default ReviewCreatePage;
