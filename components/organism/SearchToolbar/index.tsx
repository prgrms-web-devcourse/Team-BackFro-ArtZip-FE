import * as S from './style';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

type CheckBoxType = {
  id: number;
  name: string;
  value: string;
};
interface SearchToolbarProps {
  type: 'place' | 'period';
  selectedValues: CheckBoxType[];
  setSelectedValues: React.Dispatch<React.SetStateAction<any>>;
}

const placeArr = [
  { id: 0, name: '모든 지역', value: 'all' },
  { id: 1, name: '서울', value: 'SEOUL' },
  { id: 2, name: '경기', value: 'GYEONGGI' },
  { id: 3, name: '인천', value: 'INCHEON' },
  { id: 4, name: '강원', value: 'GANGWON' },
  { id: 5, name: '부산', value: 'BUSAN' },
  { id: 6, name: '대구', value: 'DAEGU' },
  { id: 7, name: '대전', value: 'DAEJEON' },
  { id: 8, name: '광주', value: 'GWANGJU' },
  { id: 9, name: '울산', value: 'ULSAN' },
  { id: 10, name: '세종', value: 'SEJONG' },
  { id: 11, name: '충북', value: 'CHUNGBUK' },
  { id: 12, name: '충남', value: 'CHUNGNAM' },
  { id: 13, name: '전북', value: 'JEONBUK' },
  { id: 14, name: '전남', value: 'JEONNAM' },
  { id: 15, name: '경북', value: 'GYEONGBUK' },
  { id: 16, name: '경남', value: 'GYEONGNAM' },
  { id: 17, name: '제주', value: 'JEJU' },
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
  const [arr, setArr] = useState(type === 'place' ? placeArr : periodArr);
  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const checkedListArray = [];

        placeArr.forEach((it) => checkedListArray.push(it));

        setSelectedValues(checkedListArray);
      } else {
        setSelectedValues([]);
      }
    },
    [placeArr],
  );

  const handleCheckedValue = (it: CheckBoxType, checked: boolean) => {
    if (it.value === 'all') {
      onCheckedAll(checked);
    } else {
      if (checked) {
        setSelectedValues([...selectedValues, it]);
      } else {
        setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== it));
      }
    }
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
          {arr.map((it) => (
            <>
              <input
                type="checkbox"
                key={it.id}
                value={it.value}
                checked={selectedValues.includes(it) ? true : false}
                onChange={(e) => handleCheckedValue(it, e.target.checked)}
              />
              <label
                htmlFor="place"
                // style={{ color: checked ? 'red' : undefined }}
              >
                {it.name}
              </label>
            </>
          ))}
        </div>
      </S.ContentBox>
    </S.SearchToolbar>
  );
};
export default SearchToolbar;
