import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';

import styled from 'styled-components';
import { history } from './../../redux/configureStore';

const MyDict = (props) => {
  const dispatch = useDispatch();
  const dicts = props.saveDict;

  const deleteDict = (script_id, word) => {
    const check = window.confirm(
      '이 단어를 나만의 단어장에서 삭제하시겠습니까?'
    );
    if (check) {
      dispatch(wordActions.deleteMyDictDB(script_id, word));
      dispatch(wordActions.loadDictDB());
    }
  };

  return (
    <DictListWrapper>
      {dicts?.map((dict, idx) => (
        <BoxDict key={idx}>
          <DeleteDict>
            <svg
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => {
                deleteDict(dict[4], dict[2]);
              }}
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.5 21C16.299 21 21 16.2989 21 10.5C21 4.70111 16.299 0 10.5 0C4.701 0 0 4.70111 0 10.5C0 16.2989 4.701 21 10.5 21ZM15.1517 5.84835C15.5377 6.23407 15.5377 6.85986 15.1517 7.24589L11.8976 10.5L15.1517 13.7541C15.5376 14.1401 15.5376 14.7659 15.1517 15.1517C14.7658 15.5377 14.1401 15.5377 13.7541 15.1517L10.5 11.8975L7.24585 15.1517C6.85994 15.5377 6.23422 15.5377 5.84827 15.1517C5.46235 14.7659 5.46235 14.1401 5.84827 13.7541L9.10242 10.5L5.84827 7.24589C5.46235 6.85986 5.46235 6.23407 5.84827 5.84835C6.23419 5.46232 6.8599 5.46232 7.24585 5.84835L10.5 9.10245L13.7541 5.84835C14.1401 5.46232 14.7658 5.46232 15.1517 5.84835Z'
                fill='#636366'
              />
            </svg>
          </DeleteDict>
          <DictTitle>{dict[2]}</DictTitle>
          <DictMeaning>
            {dict[0] === dict[1] ? (
              <div>{dict[0]}</div>
            ) : (
              <>
                <div>{dict[0]}</div>
                <div>{dict[1]}</div>
              </>
            )}
          </DictMeaning>
          <DictSentence
            onClick={() => {
              history.push(`/typing/${dict[4]}`);
            }}
          >
            <svg
              width='19'
              height='18'
              viewBox='0 0 19 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.1257 1.91225V10.5174H11.0864V15.298H2.01571V1.91225H16.1257ZM16.1257 0H2.01571C0.907068 0 0 0.860513 0 1.91225V15.298C0 16.3498 0.907068 17.2103 2.01571 17.2103H12.0942L18.1414 11.4735V1.91225C18.1414 0.860513 17.2343 0 16.1257 0ZM9.07068 10.5174H4.03141V8.60513H9.07068V10.5174ZM14.1099 6.69288H4.03141V4.78063H14.1099V6.69288Z'
                fill='black'
              />
            </svg>
            <div>
              {(dict[3]?.split(dict[2]).length >= 2
                ? dict[3]?.split(dict[2])
                : dict[3]?.split(
                    dict[2].replace(/^./, dict[2][0].toUpperCase())
                  )
              )?.map((a, i, arr) => {
                if (i + 1 !== arr.length) {
                  return (
                    <span key={i}>
                      {a}
                      <span style={{ color: '#FF2E00' }}>{dict[2]}</span>
                    </span>
                  );
                }
                return <span key={i}>{a}</span>;
              })}
            </div>
          </DictSentence>
        </BoxDict>
      ))}
    </DictListWrapper>
  );
};

const DictListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 25px 60px 0;
  > div:last-of-type {
    margin-right: 0;
  }
`;

const BoxDict = styled.div`
  width: 438px;
  height: 411px;
  background: #e2e2e2;
  border-radius: 10px;
  color: black;
  margin-right: 17px;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
`;

const DeleteDict = styled.div`
  cursor: pointer;
  width: 21px;
  height: 21px;
  position: absolute;
  z-index: 2;
  top: 16px;
  right: 16px;
  > svg {
    width: 21px;
    width: 21px;
  }
`;

const DictTitle = styled.div`
  flex: 12.9%;
  margin-bottom: 21px;
  display: flex;
  align-items: center;
  padding: 0 55px;

  font-weight: 600;
  font-size: 40px;
  letter-spacing: -0.015em;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 11px;
    height: 41px;
    background: #ff2e00;
    border-radius: 2px;
    position: absolute;
    left: 32px;
    top: calc(50% - 18px);
  }
`;
const DictMeaning = styled.div`
  flex: 27% 0 0;
  padding: 0 32px;
  height: 111px;

  > div {
    width: 374px;
    height: 50px;
    background: #3a3a3c;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;

    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 24px;
    letter-spacing: -0.015em;
    color: #ffffff;
  }
  > div:first-of-type {
    margin-bottom: 11px;
  }
`;
const DictSentence = styled.div`
  display: flex;
  padding: 15px 25px 0 30px;
  justify-content: space-between;
  cursor: pointer;

  > svg {
    width: 19px;
    height: 18px;
    margin-top: 5px;
  }
  > div {
    width: 355px;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: -0.015em;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
`;
export default MyDict;
