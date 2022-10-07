import { useRef, useState, useEffect } from 'react';
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
import { ValueOf } from 'types/utility';
import Head from 'next/head';

export interface SubmitData {
  // exhibitionId: number;
  // date: string;
  // title: string;
  // content: string;
  // isPublic: boolean;
  // deletedPhotos?: number[];
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

const ReviewCreatePage = () => {
  const submitData = useRef<SubmitData>({ ...initialData });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    query.exhibitionId && handleChange('exhibitionId', Number(query.exhibitionId));
  }, []);

  const handleChange = (key: string, value: ValueOf<SubmitData>) => {
    submitData.current[key] = value;
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (isChecking) {
      return;
    }

    const data = submitData.current;
    if (!isLoading && validateReviewEditForm(data)) {
      setIsLoading(true);
      let formData = convertObjectToFormData('data', data);
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
      <Head>
        <title>ArtZip | 후기 작성</title>
      </Head>
      <>
        <Banner
          subtitle="Art.zip 후기 작성"
          title="전시회 다녀오셨나요?"
          content="소중한 경험을 후기로 작성하세요!"
        />
        <Section>
          <ReviewEditForm layout="vertical">
            <FormItem label="다녀 온 전시회">
              <ExhibitionSearchBar prevData={query} onExhibitionChange={handleChange} />
            </FormItem>
            <FormItem label="다녀 온 날짜">
              <DateInput
                onChange={(value) => {
                  value && handleChange('date', value.format('YYYY-MM-DD'));
                }}
              />
            </FormItem>
            <FormItem label="제목">
              <Input
                placeholder="제목을 입력해주세요"
                showCount
                maxLength={30}
                onChange={(e) => {
                  handleChange('title', e.target.value);
                }}
              />
            </FormItem>
            <FormItem label="내용">
              <TextArea
                placeholder="내용을 입력해주세요(1000자 이하)"
                autoSize
                onChange={(e) => {
                  handleChange('content', e.target.value);
                }}
              />
            </FormItem>
            <FormItem label="사진">
              <ImageUpload fileList={files} setFileList={setFiles} limit={9} />
            </FormItem>
            <FormItem label="공개 여부">
              <ToggleSwitch
                defaultChecked
                onChange={(checked) => {
                  handleChange('isPublic', checked);
                  setIsPublic(checked);
                }}
              />
              {isPublic ? '전체 공개' : '비공개'}
            </FormItem>

            <SubmitButton type="primary" ref={debounceRef}>
              작성완료
            </SubmitButton>
          </ReviewEditForm>
        </Section>
      </>
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

const DateInput = styled(DatePicker)`
  width: 200px;

  & > input {
    font-size: 1.6rem;
  }
`;

const TextArea = styled(Input.TextArea)``;

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
