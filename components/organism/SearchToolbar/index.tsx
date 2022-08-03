import * as S from './style';
import { HomeOutlined } from '@ant-design/icons';

interface SearchToolbarProps {
  type: 'place' | 'time';
}
const SearchToolbar = ({ type }: SearchToolbarProps) => {
  return (
    <S.SearchToolbar>
      {type === 'place' && (
        <S.IconBox>
          <S.Icon>
            <HomeOutlined />
          </S.Icon>
        </S.IconBox>
      )}
    </S.SearchToolbar>
  );
};
export default SearchToolbar;
