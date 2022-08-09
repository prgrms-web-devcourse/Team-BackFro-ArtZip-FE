import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchResultPageStyle as S } from '../../styles/pages';
import { NextPage } from 'next';

const SearchResultPage: NextPage = () => {
  const router = useRouter();
  const { exhibition } = router.query;

  const [currentPage, setCurrentPage] = useState(1);

  //TODO : 서버애서 받은 total 값 넣을 예정
  const [total, setTotal] = useState(100);

  return (
    <S.SearchResultContainer>
      <Head>
        <title>ArtZip | SearchResult</title>
      </Head>
      {exhibition && <div>SearchResult: {exhibition}</div>}
      {/* 
      <S.SearchResultContents>
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />{' '}
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />
      </S.SearchResultContents> */}
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
