import * as S from './style';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface SearchToolbarProps {
  type: 'place' | 'period';
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<any>>;
}

const placeArr = [
  { id: 0, name: '모든 지역', value: 'all', checked: true },
  { id: 1, name: '서울', value: 'SEOUL', checked: false },
  { id: 2, name: '경기', value: 'GYEONGGI', checked: false },
  //   { name: '인천', value: 'INCHEON' },
  //   { name: '강원', value: 'GANGWON' },
  //   { name: '부산', value: 'BUSAN' },
  //   { name: '대구', value: 'DAEGU' },
  //   { name: '대전', value: 'DAEJEON' },
  //   { name: '광주', value: 'GWANGJU' },
  //   { name: '울산', value: 'ULSAN' },
  //   { name: '세종', value: 'SEJONG' },
  //   { name: '충북', value: 'CHUNGBUK' },
  //   { name: '충남', value: 'CHUNGNAM' },
  //   { name: '전북', value: 'JEONBUK' },
  //   { name: '전남', value: 'JEONNAM' },
  //   { name: '경북', value: 'GYEONGBUK' },
  //   { name: '경남', value: 'GYEONGNAM' },
  //   { name: '제주', value: 'JEJU' },
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

const SearchToolbar = ({ type, selectedValues, setSelectedValues }: SearchToolbarProps) => {
  const handleCheckedValue = (value: string, id: number) => {
    placeArr[id].checked = !placeArr[id].checked;
    setSelectedValues(placeArr);
  };

  useEffect(() => {
    console.log('change', selectedValues);
  }, [selectedValues, setSelectedValues]);
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
        <div className="content-box-title">{type === 'place' ? '개최장소' : '개최시기'}</div>
        <div className="content-box-sub">
          {type === 'place'
            ? placeArr.map((it) => (
                <div key={it.id} onClick={() => handleCheckedValue(it.value, it.id)}>
                  {it.name}
                </div>
              ))
            : periodArr.map((it, idx) => <div key={idx}>{it}</div>)}
        </div>
      </S.ContentBox>
    </S.SearchToolbar>
  );
};
export default SearchToolbar;
