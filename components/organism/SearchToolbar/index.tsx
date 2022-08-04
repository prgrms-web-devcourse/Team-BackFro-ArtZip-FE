import * as S from './style';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { exhibitionPeriod, exhibitionPlace } from '../../../constants';

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

const SearchToolbar = ({ type, selectedValues, setSelectedValues }: SearchToolbarProps) => {
  const [array, setArray] = useState(type === 'place' ? exhibitionPlace : exhibitionPeriod);
  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const checkedListArray: CheckBoxType[] = [];

        if (type === 'place') {
          exhibitionPlace.forEach((it) => checkedListArray.push(it));
        } else {
          exhibitionPeriod.forEach((it) => checkedListArray.push(it));
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
          {array.map((it) => (
            <div className="content-box-input">
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
