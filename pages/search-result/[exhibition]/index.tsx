import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchResultPageStyle as S } from 'styles/pages';
import { NextPage } from 'next';
import { ExhibitionProps } from 'types/model';
import { exhibitionAPI } from 'apis';
import { ExhibitionCard } from 'components/molecules';
import styled from '@emotion/styled';

const SearchResultPage: NextPage = () => {
  const router = useRouter();
  const [exhibition, setExhibition] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<ExhibitionProps[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const { exhibition } = router.query;
    if (typeof exhibition === 'string') {
      setExhibition(exhibition);
    }
  }, [router.query]);

  useEffect(() => {
    if (exhibition) {
      exhibitionAPI
        .search(exhibition, currentPage, 10, true)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage, exhibition]);

  return (
    <S.SearchResultContainer>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      <S.SearchResultContents>
        {exhibitions.length > 0 ? (
          exhibitions.map((exhibition) => (
            <ExhibitionCard
              exhibitionId={exhibition.exhibitionId}
              key={exhibition.exhibitionId}
              name={exhibition.name}
              thumbnail={exhibition.thumbnail}
              startDate={exhibition.startDate!}
              endDate={exhibition.endDate!}
              likeCount={exhibition.likeCount!}
              reviewCount={exhibition.reviewCount!}
              isLiked={exhibition.isLiked!}
            />
          ))
        ) : (
          <div>
            <Logo>Art.zip</Logo>
            <h4>해당하는 전시회가 없습니다. </h4>
          </div>
        )}
      </S.SearchResultContents>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={currentPage + 1}
        total={total}
        defaultPageSize={10}
        showSizeChanger={false}
        pageSize={10}
        onChange={(page) => setCurrentPage(page - 1)}
      />
    </S.SearchResultContainer>
  );
};

export default SearchResultPage;

const Logo = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue.main};
  margin-bottom: 30px;
  cursor: pointer;
`;
