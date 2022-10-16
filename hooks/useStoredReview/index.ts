import { useSessionStorage } from 'hooks';
import { FieldValue } from 'components/organisms/ReviewEditForm';

const key = 'STORED_REVIEW';

interface StoredReview {
  [key: string]: FieldValue;
}

const initialData: StoredReview = {
  exhibitionId: 0,
  exhibitionName: '',
  exhibitionThumbnail: '',
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

const useStoredReview = () => {
  const { getItem, setItem, removeItem } = useSessionStorage<StoredReview>(key, initialData);
  return {
    getStoredReview: getItem,
    setStoredReview: setItem,
    removeStoredReview: removeItem,
  };
};

export default useStoredReview;
