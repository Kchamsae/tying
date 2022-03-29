import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { history } from '../../redux/configureStore';
import { actionCreators as wordActions } from '../../redux/modules/word';
import MyAllDict from './MyAllDict';

const MyAllDictList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordActions.loadAllDictDB());
  }, []);

  const saveDict = useSelector((state) => state.word.dict_list2);

  return (
    <>
      <PrevPage onClick={() => {history.goBack()}}>
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L8 8L2 14" stroke="#878889" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        이전 페이지
      </PrevPage>
      <AllDictList>
        <ListHeader>
          <WordSection header>
            단어
          </WordSection>
          <MeaningSection header>
            뜻
          </MeaningSection>
          <SentenceSection header>
            예문
          </SentenceSection>
        </ListHeader>
        {
          saveDict.map((a,i)=>{
            return(
              <MyAllDictItem key={i} {...a}/>
            )
          })
        }
        <ListFooter/>
      </AllDictList>
    </>
  );
};




const MyAllDictItem = (props) => {

  const dispatch = useDispatch();

  const deleteDict = (script_id, word) => {
    const check = window.confirm('이 단어를 나만의 단어장에서 삭제하시겠습니까?')
    if(check){
      dispatch(wordActions.deleteMyDictDB(script_id, word));
      // dispatch(wordActions.loadDictDB());
    }
  }

  return (
    <ListItem>
      <WordSection>
        {props[2]}
        <div>
          <div onClick={() => { deleteDict(props[4], props[2]) }}>+</div>
        </div>
      </WordSection>
      <MeaningSection>
        <div>{props[0]}</div>
        {props[0]!==props[1] && (
          <div>{props[1]}</div>
        )}
      </MeaningSection>
      <SentenceSection>
        <div onClick={()=>{history.push(`/typing/${props[4]}`)}}>
          {
            (props[3].split(props[2]).length >=2 ? props[3].split(props[2]) : props[3].split(props[2].replace(/^./, props[2][0].toUpperCase()))).map((a,i,arr)=>{
              if(i+1 !== arr.length){
                return(
                  <React.Fragment key={i}>
                    {a}
                    <span style={{color: '#FF2E00'}}>{props[2]}</span>  
                  </React.Fragment>
                )
              }
              return <React.Fragment key={i}>{a}</React.Fragment>
            })
          }
        </div>    
      </SentenceSection>
    </ListItem>
  );
};

const PrevPage = styled.div`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 22px;
  color: #878889;
  margin-left: 70px;
  width: 127px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  >svg{
    transform: rotate(180deg);
    width: 11px;
    height: 16px;
    margin-left: 5px;
  }
`;

const AllDictList = styled.div`
  width: 1659px;
  margin: 40px auto;
  position: relative;
  padding-bottom: 100px;

  &:before{
    content: '';
    display: block;
    height: calc(100% - 100px);
    border-right: 2px solid #D2D2D2;
    position: absolute;
    left: calc(11.93% - 2px);
    top: 0;
  }

  &:after{
    content: '';
    display: block;
    height: calc(100% - 100px);
    border-right: 2px solid #D2D2D2;
    position: absolute;
    left: calc(11.93% + 15.61% - 2px);
    top: 0;
  }
`;

const ListHeader = styled.div`
  display: flex;
  height: 56px;
  border-bottom: 2px solid #D2D2D2;
`;
const WordSection = styled.div`
  flex: 11.93% 0 1;
  display: flex;
  padding-left: 22px;
  box-sizing: border-box;
  
  padding-top: 22px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.015em;
  
  ${props=>{
    if(props.header){
      return css`
        &{
          padding-top: 0;
          align-items: center;
          font-family: 'Noto Sans KR';
          font-weight: 500;
          font-size: 20px;
          color: #878889;
        }
      `;
    }
  }}

  > div{
    margin-left: 5px;
  }

  >div>div{
    color: #878889;
    font-weight: 300;
    transform: rotate(45deg);
    cursor: pointer;
  }
`;
const MeaningSection = styled(WordSection)`
  flex: 15.61% 0 1;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 18px;
  flex-direction: ${props => props.header ? 'row' : 'column'};
`;
const SentenceSection = styled(WordSection)`
  flex: 72.46% 0 1;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  
  ${props => !props.header && 'padding-right: 30px; padding-bottom: 22px; display: block;'};
  >div{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
`;

const ListItem = styled(ListHeader)`
  height: 99px;
`;
const ListFooter = styled(ListHeader)`
  height: 51px;
  border: 0;
`;
export default MyAllDictList;
