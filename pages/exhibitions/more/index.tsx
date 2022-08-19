import type { NextPage } from 'next';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Banner, ExhibitionCard } from 'components/molecule';
import * as S from '../../../styles/pages/exhibitionsMore';
import { exhibitionAPI } from 'apis';
import { ExhibitionProps } from 'types/model';

//exhibitions/more
const ExhibitionsMore: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<ExhibitionProps[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (type === 'upcoming') {
      exhibitionAPI
        .getUpcoming(currentPage, 10)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
        })
        .catch((err) => console.log(err));
    } else {
      exhibitionAPI
        .getMostLike(currentPage, 10, true)
        .then((res) => {
          setTotal(res.data.data.totalPage);
          setExhibitions(res.data.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  return (
    <S.ExhibitionsMore>
      <div>
        <Banner
          subtitle={'Art.zip 전시회 모아 보기'}
          title={type === 'upcoming' ? '다가오는 전시회' : '인기많은 전시회'}
          content={
            type === 'upcoming'
              ? '다가오는 전시회를 확인하세요 !'
              : '지금 핫한 전시회를 확인하세요 !'
          }
        />
      </div>
      <S.ExhibitionsMoreContent>
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
      </S.ExhibitionsMoreContent>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={currentPage + 1}
        total={total * 10}
        defaultPageSize={10}
        showSizeChanger={false}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page - 1);
        }}
      />
    </S.ExhibitionsMore>
  );
};
export default ExhibitionsMore;
