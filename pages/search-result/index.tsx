import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchResultPageStyle as S } from '../../styles/pages';
import { NextPage } from 'next';
import { ExhibitionProps } from 'types/model';
import { exhibitionAPI } from 'apis';
import { ExhibitionCard } from 'components/molecule';

const SearchResultPage: NextPage = () => {
  const router = useRouter();
  const { exhibition } = router.query;
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<ExhibitionProps[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof exhibition === 'string') {
      exhibitionAPI
        .search(exhibition, currentPage, 8, true)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  return (
    <S.SearchResultContainer>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      {exhibition && <div>SearchResult: {exhibition}</div>}

      <S.SearchResultContents>
        {exhibitions.map((exhibition) => (
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
        ))}
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
