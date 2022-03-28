import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as wordActions } from '../../redux/modules/word';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const MyDict = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dicts = props.saveDict;
  console.log(dicts);
  return (
    <div style={{ display: 'flex', marginLeft: '80px' }}>
      {dicts.map((dict, idx) => (
        <BoxDict key={idx}>
          <div style={{ height: '55%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                verticalAlign: 'center',
                padding: 0,
              }}
            >
              <div style={{ display: 'flex', verticalAlign: 'center' }}>
                <div className='bar-title'></div>
                <h1 className='word-title'>{dict[2]}</h1>
              </div>
              <svg
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                cursor='pointer'
                onClick={() => {
                  dispatch(wordActions.deleteMyDictDB(dict[4], dict[2]));
                }}
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M10.5 21C16.299 21 21 16.2989 21 10.5C21 4.70111 16.299 0 10.5 0C4.701 0 0 4.70111 0 10.5C0 16.2989 4.701 21 10.5 21ZM15.1517 5.84835C15.5377 6.23407 15.5377 6.85986 15.1517 7.24589L11.8976 10.5L15.1517 13.7541C15.5376 14.1401 15.5376 14.7659 15.1517 15.1517C14.7658 15.5377 14.1401 15.5377 13.7541 15.1517L10.5 11.8975L7.24585 15.1517C6.85994 15.5377 6.23422 15.5377 5.84827 15.1517C5.46235 14.7659 5.46235 14.1401 5.84827 13.7541L9.10242 10.5L5.84827 7.24589C5.46235 6.85986 5.46235 6.23407 5.84827 5.84835C6.23419 5.46232 6.8599 5.46232 7.24585 5.84835L10.5 9.10245L13.7541 5.84835C14.1401 5.46232 14.7658 5.46232 15.1517 5.84835Z'
                  fill='#636366'
                />
              </svg>
            </div>
            {dict[0] === dict[1] ? (
              <div className='dict-meaning'>
                <h2 className='word-meaning'>{dict[0]}</h2>
              </div>
            ) : (
              <React.Fragment>
                <div className='dict-meaning'>
                  <h2 className='word-meaning'>{dict[0]}</h2>
                </div>
                <div className='dict-meaning'>
                  <h2 className='word-meaning'>{dict[1]}</h2>
                </div>
              </React.Fragment>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              marginTop: '10px',
              flexDirection: 'row',
            }}
          >
            <svg
              width='19'
              height='18'
              viewBox='0 0 19 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              cursor='pointer'
              onClick={() => {
                history.push(`/typing/${dict[4]}`);
              }}
            >
              <path
                d='M16.1257 1.91225V10.5174H11.0864V15.298H2.01571V1.91225H16.1257ZM16.1257 0H2.01571C0.907068 0 0 0.860513 0 1.91225V15.298C0 16.3498 0.907068 17.2103 2.01571 17.2103H12.0942L18.1414 11.4735V1.91225C18.1414 0.860513 17.2343 0 16.1257 0ZM9.07068 10.5174H4.03141V8.60513H9.07068V10.5174ZM14.1099 6.69288H4.03141V4.78063H14.1099V6.69288Z'
                fill='black'
              />
            </svg>
            <p className='word-paragraph'>{dict[3]}</p>
          </div>
        </BoxDict>
      ))}
    </div>
  );
};

const BoxDict = styled.div`
  width: 438px;
  heigth: 411px;
  background: #e2e2e2;
  border-radius: 10px;
  color: black;
  margin: 10px;
  padding: 10px 10px 50px 10px;

  .bar-title {
    width: 11px;
    height: 41px;
    margin: auto;
    border-radius: 5px;
    background: #ff2e00;
  }

  .word-title {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 5px;
    margin-left: 15px;
  }

  .delete-btn {
    width: 21px;
    height: 21px;
  }

  .dict-meaning {
    width: 374px;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding-left: 25px;
    background: #3a3a3c;
    margin: 5px;
  }

  .word-meaning {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
  }

  .word-paragraph {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    display: block;
    margin-left: 5px;
    margin-top: 0px;
    width: 90%;
    padding-left: 5px;
  }
`;

const BoxMeaning = styled.div`
  width: 374px;
  height: auto;
  background: #3A3A3C !important
  color: white;
  padding-left: 10px;
`;

export default MyDict;
