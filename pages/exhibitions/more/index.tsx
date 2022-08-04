import type { NextPage } from 'next';
import { useRouter } from 'next/router';

//exhibitions/more
const ExhibitionMore: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  return <div>더보기페이지 {type}</div>;
};
export default ExhibitionMore;
