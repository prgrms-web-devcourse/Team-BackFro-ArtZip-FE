import SearchToolbar from 'components/organism/SearchToolbar';
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Pagination } from 'antd';
import * as S from '../../../styles/pages/exhibitionsCustom';

//exhibitions/custom
const ExhibitionCustom: NextPage = () => {
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  //TODO : 서버애서 받은 total 값 넣을 예정
  const [total, setTotal] = useState(100);
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
    </S.ExhibitionsCustom>
  );
};
export default ExhibitionCustom;
