import React, { Fragment, useMemo } from 'react';
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
        Header: '단어',
        accessor: '2',
        className: 'word',
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
        },
      },
      {
        Header: '뜻',
        accessor: (row) => {
          if (row[0] === row[1]) {
            return row[0];
          } else {
            return row[0] + ', ' + row[1];
          }
        },
      },
      {
        Header: '예문',
        accessor: '3',
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
  font-weight: medium;
  font-size: 22px;
  color: #878889;
  margin-left: 110px;
  cursor: pointer;
`;

export default MyAllDict;
