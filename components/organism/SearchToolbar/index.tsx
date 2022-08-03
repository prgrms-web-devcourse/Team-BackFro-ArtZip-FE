import * as S from './style';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';

interface SearchToolbarProps {
  type: 'place' | 'period';
}

const placeArr = [
  '모든 지역',
  '서울',
  '경기',
  '인천',
  '강원',
  '부산',
  '경남',
  '대구',
  '경북',
  '대전',
  '울산',
  '해외',
];

const periodArr = [
  '모든 날짜',
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];
const SearchToolbar = ({ type }: SearchToolbarProps) => {
  return (
    <S.SearchToolbar>
      {type === 'place' ? (
        <S.IconBox>
          <S.Icon>
            <HomeOutlined />
          </S.Icon>
        </S.IconBox>
      ) : (
        <S.IconBox>
          <S.Icon>
            <CalendarOutlined />
          </S.Icon>
        </S.IconBox>
      )}
      <S.ContentBox>
        <div className="content-box-title">{type === 'place' ? '개최장소' : '모든지역'}</div>
        <div className="content-box-sub">
          {type === 'place' && placeArr.map((it, idx) => <div key={idx}>{it}</div>)}
        </div>
      </S.ContentBox>
    </S.SearchToolbar>
  );
};
export default SearchToolbar;
