import { useSessionStorage } from 'hooks';
import { SubmitData } from 'components/organisms/ReviewEditForm';

const key = 'SAVED_REVIEW_ITEM';

const initialData = {
  exhibitionId: 0,
  exhibitionName: '',
  exhibitionThumbnail: '',
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

const useAutoSaveReview = () => {
  return useSessionStorage<SubmitData>(key, initialData);
};

export default useAutoSaveReview;
