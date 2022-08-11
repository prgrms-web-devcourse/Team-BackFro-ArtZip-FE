import SearchToolbar from 'components/organism/SearchToolbar';
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Pagination } from 'antd';
import * as S from '../../../styles/pages/exhibitionsCustom';
import { ExhibitionProps } from 'types/model';
import { exhibitionAPI } from 'apis';
import { ExhibitionCard } from 'components/molecule';

//exhibitions/custom
const ExhibitionCustom: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [exhibitions, setExhibitions] = useState<ExhibitionProps[]>([]);
  const [selectedArea, setSelectedArea] = useState<{ id: number; value: string; name: string }[]>(
    [],
  );
  const [selectedPeriod, setSelectedPeriod] = useState<
    { id: number; value: string; name: string }[]
  >([]);

  const [total, setTotal] = useState(0);

  const getSelectedValue = (values: { id: number; value: string; name: string }[]) => {
    if ((values.length > 0 && values[0]!.value === 'ALL') || values.length === 0) {
      return 'ALL';
    }
    const areas: string[] = [];
    values.map((it) => areas.push(it.value));

    return areas.join(',');
  };
  useEffect(() => {
    console.log('currentPage', currentPage);
    exhibitionAPI
      .custom(getSelectedValue(selectedArea), getSelectedValue(selectedPeriod), currentPage, 8)
      .then((res) => {
        console.log('data', res.data.data.content);
        setTotal(res.data.data.totalPage);
        setExhibitions(res.data.data.content);
      });
  }, [currentPage, selectedArea, selectedPeriod]);

  useEffect(() => {
    exhibitionAPI.custom('ALL', 'ALL', 0, 8).then((res) => {
      setTotal(res.data.data.totalPage);
      setExhibitions(res.data.data.content);
    });
  }, []);
  return (
    <S.ExhibitionsCustom>
      <SearchToolbar
        type="place"
        selectedValues={selectedArea}
        setSelectedValues={setSelectedArea}
      />
      <SearchToolbar
        type="period"
        selectedValues={selectedPeriod}
        setSelectedValues={setSelectedPeriod}
      />
      <S.ExhibitionsCustomContent>
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
      </S.ExhibitionsCustomContent>
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
    </S.ExhibitionsCustom>
  );
};
export default ExhibitionCustom;
