import { useSessionStorage } from 'hooks';

const key = 'DRAFT_REVIEW_DATA';

const initialData = {
  exhibitionId: 0,
  exhibitionName: '',
  exhibitionThumbnail: '',
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

const useDraftReview = () => {
  return useSessionStorage(key, initialData);
};

export default useDraftReview;
