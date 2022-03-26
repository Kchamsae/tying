import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';

import styled from 'styled-components';

const MyDict = (props) => {
  const dispatch = useDispatch();
  const dicts = props.saveDict;
  console.log(dicts);
  return (
    <div style={{ display: 'flex' }}>
      {dicts.map((dict, idx) => (
        <CardBox key={idx}>
          <button
            onClick={() => {
              dispatch(wordActions.deleteMyDictDB(dict[4], dict[2]));
            }}
          >
            삭제
          </button>
          <h1>{dict[2]}</h1>
          {dict[0] === dict[1] ? (
            <h2>{dict[0]}</h2>
          ) : (
            <div>
              <h2>{dict[0]}</h2>
              <h2>{dict[1]}</h2>
            </div>
          )}
          <p>{dict[3]}</p>
        </CardBox>
      ))}
    </div>
  );
};

const CardBox = styled.div`
  width: 300px;
  heigth: 300px;
  background-color: grey;
  color: white;
`;

export default MyDict;
