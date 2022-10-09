import styled from '@emotion/styled';
import { Input, Image, message } from 'antd';
import DEFAULT_IMAGE from 'constants/defaultImage';
import { useState, useRef, useCallback, useEffect } from 'react';
import { getErrorMessage, show, hide } from 'utils';
import { useDebounce } from 'hooks';
import { reviewAPI } from 'apis';
import { ValueOf } from 'types/utility';
import { SubmitData } from 'components/organisms/ReviewEditForm';
import ErrorMessage, { MESSAGE_COMMON as MESSAGE } from '../../utils/ErrorMessage';

interface ExhibitionSearchBarProps {
  type: 'create' | 'update';
  prevData?: {
    id: number;
    name: string;
    thumbnail: string;
  };
  isPrevDataChanged?: boolean;
  wasSubmitted: boolean;
  onValueChange: (key: string, value: ValueOf<SubmitData>) => void;
  onErrorChange: (key: string, value: string) => void;
}

interface SearchResult {
  exhibitionId: number;
  name: string;
  thumbnail: string;
}

const ExhibitionSearchBar = ({
  type,
  prevData,
  isPrevDataChanged,
  wasSubmitted,
  onValueChange,
  onErrorChange,
}: ExhibitionSearchBarProps) => {
  const [exhibitionId, setExhibitionId] = useState(prevData ? prevData.id : 0);
  const [searchWord, setSearchWord] = useState('');
  const [exhibitionName, setExhibitionName] = useState(prevData ? prevData.name : '');
  const [posterImage, setPosterImage] = useState(
    prevData ? prevData.thumbnail : DEFAULT_IMAGE.EXHIBITION_THUMBNAIL,
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>();
  const resultList = useRef<HTMLUListElement>(null);
  const [errorMessage, setErrormessage] = useState(
    prevData ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE,
  );
  const displayErrorMessage = wasSubmitted && !!errorMessage;

  useEffect(() => {
    if (isPrevDataChanged && prevData) {
      setExhibitionId(prevData.id);
      setExhibitionName(prevData.name);
      setPosterImage(prevData.thumbnail);
      setErrormessage(MESSAGE.NO_ERROR);
    }
  }, [isPrevDataChanged]);

  const handleSearch = useCallback(async () => {
    const isEmpty = !/\S/.test(searchWord);
    if (isEmpty) {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await reviewAPI.searchExhibition(searchWord);
      const { exhibitions } = data.data;
      setSearchResults([...exhibitions]);
      resultList.current && show(resultList.current);
      !exhibitions.length && message.warning('검색 결과가 없습니다.');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
  }, [searchWord]);
  useDebounce(handleSearch, 500, searchWord);

  const handleResultClick = ({ exhibitionId, name, thumbnail }: SearchResult) => {
    setExhibitionId(exhibitionId);
    setExhibitionName(name);
    setPosterImage(thumbnail);
    setErrormessage(MESSAGE.NO_ERROR);
    resultList.current && hide(resultList.current);
  };

  useEffect(() => {
    onValueChange('exhibitionId', exhibitionId);
    onValueChange('exhibitionName', exhibitionName);
    onValueChange('exhibitionThumbnail', posterImage);
    onErrorChange('exhibition', errorMessage);
  }, [exhibitionId, exhibitionName, posterImage, errorMessage]);

  return (
    <SearchContainer>
      <InnerContainer>
        <SearchBar
          placeholder="전시회 제목을 검색해 주세요"
          value={exhibitionName || searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          onFocus={() => {
            setExhibitionName('');
            resultList.current && show(resultList.current);
          }}
          disabled={type === 'update'}
        />
        <ResultList ref={resultList}>
          {searchResults?.map((item) => (
            <ResultItem
              key={item.exhibitionId}
              onClick={() => {
                handleResultClick(item);
              }}
            >
              {item.name}
            </ResultItem>
          ))}
        </ResultList>
        <ErrorMessage message={errorMessage} visible={displayErrorMessage} />
      </InnerContainer>
      <Poster
        src={posterImage}
        alt="전시회 포스터 이미지"
        preview={posterImage !== DEFAULT_IMAGE.EXHIBITION_THUMBNAIL}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-right: 20px;
`;

const SearchBar = styled(Input.Search)`
  font-size: 1.6rem;
  position: relative;
  z-index: 1;

  .ant-input {
    height: 36px;
  }

  .ant-input-search-button {
    height: 36px;
  }
`;

const ResultList = styled.ul`
  width: 100%;
  max-height: 168px;
  border: 1px solid ${({ theme }) => theme.color.border.light};
  position: relative;
  top: -3px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.white};
`;

const ResultItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 8px;
`;

const Poster = styled(Image)`
  width: 150px;
  height: 200px;
  flex-shrink: 0;
`;

export default ExhibitionSearchBar;
