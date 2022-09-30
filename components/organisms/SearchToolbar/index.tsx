import * as S from './style';
import { HomeOutlined, CalendarOutlined, AreaChartOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { EXHIBITION_PERIOD, EXHIBITION_PLACE, EXHIBITION_GENRE } from '../../../constants';

type CheckBoxType = {
  id: number;
  name: string;
  value: string;
};
interface SearchToolbarProps {
  type: 'place' | 'period' | 'genre';
  selectedValues: CheckBoxType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedValues: React.Dispatch<React.SetStateAction<any>>;
}

const SearchToolbar = ({ type, selectedValues, setSelectedValues }: SearchToolbarProps) => {
  const [array, setArray] = useState(EXHIBITION_PLACE);

  useEffect(() => {
    if (type === 'place') {
      setArray(EXHIBITION_PLACE);
    } else if (type === 'period') {
      setArray(EXHIBITION_PERIOD);
    } else {
      setArray(EXHIBITION_GENRE);
    }
  }, []);

  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const checkedListArray: CheckBoxType[] = [];
        if (type === 'place') {
          EXHIBITION_PLACE.forEach((it) => checkedListArray.push(it));
        } else if (type === 'period') {
          EXHIBITION_PERIOD.forEach((it) => checkedListArray.push(it));
        } else if (type === 'genre') {
          EXHIBITION_PERIOD.forEach((it) => checkedListArray.push(it));
        }

        setSelectedValues(checkedListArray);
      } else {
        setSelectedValues([]);
      }
    },
    [array],
  );

  const handleCheckedValue = (it: CheckBoxType, checked: boolean) => {
    if (it.value === 'ALL') {
      onCheckedAll(checked);
    } else {
      if (checked) {
        setSelectedValues([...selectedValues, it]);
      } else {
        setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== it));
      }
    }
  };

  return (
    <S.SearchToolbar>
      {type === 'place' && (
        <S.IconBox>
          <S.Icon>
            <HomeOutlined />
          </S.Icon>
        </S.IconBox>
      )}
      {type === 'period' && (
        <S.IconBox>
          <S.Icon>
            <CalendarOutlined />
          </S.Icon>
        </S.IconBox>
      )}
      {type === 'genre' && (
        <S.IconBox>
          <S.Icon>
            <AreaChartOutlined />
          </S.Icon>
        </S.IconBox>
      )}
      <S.ContentBox>
        <div className="content-box-title">
          {type === 'place' && '개최장소'}
          {type === 'period' && '개최시기'}
          {type === 'genre' && '장르'}
        </div>
        <div className="content-box-sub">
          {array.map((it) => (
            <div className="content-box-input" key={it.id}>
              <input
                type="checkbox"
                key={it.id}
                value={it.value}
                checked={selectedValues.includes(it) ? true : false}
                onChange={(e) => handleCheckedValue(it, e.target.checked)}
              />
              <label style={{ fontWeight: selectedValues.includes(it) ? '600' : undefined }}>
                {it.name}
              </label>
            </div>
          ))}
        </div>
      </S.ContentBox>
    </S.SearchToolbar>
  );
};
export default SearchToolbar;
