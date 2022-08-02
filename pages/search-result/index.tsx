import Head from 'next/head';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ExhibitionCard } from 'components/molecule';
import * as S from './style';
import { NextPage } from 'next';

const SearchResultPage: NextPage = () => {
  const ret = {
    exhibitionId: 1,
    name: '번아웃증후군',
    thumbnail: 'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
    startDate: '2022-08-04',
    endDate: '2022-08-10',
    area: 'SEOUL',
    url: 'http://galleryraon.com/?page_id=2472#upcoming',
    placeUrl: 'http://galleryraon.com/?page_id=2472#upcoming',
    inquiry: '010-8425-8082',
    fee: '무료',
    genre: '',
    description: '',
    likeCount: 5,
    placeAddr: '서울특별시 종로구 자하문로41길 4 갤러리라온',
    lat: 37.597625,
    lng: 126.962292,
    isLiked: false,
    reviews: [
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
    ],
  };
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

      <S.SearchResultContents>
        <ExhibitionCard
          exhibitionId={ret.exhibitionId}
          name={ret.name}
          thumbnail={ret.thumbnail}
          startDate={ret.startDate}
          endDate={ret.endDate}
          likeCount={ret.likeCount}
          reviewCount={ret.reviews.length}
        />
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
      </S.SearchResultContents>
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
