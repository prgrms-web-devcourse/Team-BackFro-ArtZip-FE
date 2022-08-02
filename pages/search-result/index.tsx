import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as S from './style';

const SearchResultPage = () => {
  const router = useRouter();
  const { exhibition } = router.query;
  const { type } = router.query;

  const [currentPage, setCurrentPage] = useState(1);

  //TODO : 서버애서 받은 total 값 넣을 예정
  const [total, setTotal] = useState(100);

  return (
    <S.SearchResultContainer>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      {type === 'upcoming' && (
        <div>
          <h2>다가오는 전시회</h2>
        </div>
      )}
      {type === 'popular' && (
        <div>
          <h2>인기많은 전시회</h2>
        </div>
      )}
      {exhibition && <div>SearchResult: {exhibition}</div>}

      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={currentPage}
        total={total}
        defaultPageSize={10}
        showSizeChanger={false}
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
      />
    </S.SearchResultContainer>
  );
};

export default SearchResultPage;
