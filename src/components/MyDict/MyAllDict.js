import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyDict from './MyDict';
import Table from './Table';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const MyAllDict = ({ saveDict }) => {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        accessor: '2',
        Header: '단어',
      },
      {
        accessor: '0',
        Header: '뜻',
      },
      {
        accessor: '3',
        Header: '예문',
      },
    ],
    []
  );

  const data = saveDict;

  const prevPage = () => {
    history.push('/mypage');
  };

  return (
    <div>
      <PrevPage onClick={prevPage}>&lt; 이전 페이지</PrevPage>
      <Table COLUMNS={columns} DATA={data} />
    </div>
  );
};

const PrevPage = styled.p`
  font-family: Montserrat;
  font-weight: medium
  font-size: 22px;
  color: #878889;
  margin-left: 70px;
`;

export default MyAllDict;
