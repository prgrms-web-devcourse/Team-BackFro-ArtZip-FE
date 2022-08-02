import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchResultPage = () => {
  const router = useRouter();
  const { exhibition } = router.query;

  const [currentPage, setCurrentPage] = useState(1);

  //TODO : 서버애서 받은 total 값 넣을 예정
  const [total, setTotal] = useState(100);

  return (
    <>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      <div>SearchResult: {exhibition}</div>
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={total}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default SearchResultPage;
