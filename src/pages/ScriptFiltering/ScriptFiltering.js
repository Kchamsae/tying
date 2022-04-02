import React, { useEffect, useRef, useState } from 'react';
import ScriptItem from '../../components/ScriptItem/ScriptItem';
import ScriptItemLoading from '../../components/ScriptItemLoading';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as scriptActions } from '../../redux/modules/script';
import { actionCreators as userActions } from '../../redux/modules/user';
import { useInView } from 'react-intersection-observer';
import { history } from '../../redux/configureStore';
import { getCookie } from '../../shared/Cookie';
import { alertNew } from '../../shared/alert';
import { 
  FilteringWrapper,
  FilteringLeft,
  FilteringTitle,
  FilteringLeftInner,
  FilteringBox,
  FilteringBoxTitle,
  SavedCheck,
  CheckBox,
  FilteringCompleteButton,
  FilteringResetButton,
  FilteringRight,
  FilteringResultNone,
  FilteringResultSentence,
   } from './style';

const ScriptFiltering = () => {
  const [filter, setFilter] = useState([]);
  const [topic, setTopic] = useState([]);
  const [my_script, setMyScript] = useState(false);

  const [done, setDone] = useState(false);
  const [reset, setReset] = useState(false);

  // 무한 스크롤 구현부
  const [pageNumber, setPageNumber] = useState(1); //첫페이지 넘버값 1

  const [ref, inView] = useInView(); 

  const is_login = useSelector(state => state.user.is_login);
  const token = getCookie('token'); 

  useEffect(()=>{
    if(!token){
      alertNew('로그인 후에 이용할 수 있습니다.',()=>{
        history.replace('/');
        dispatch(userActions.setLoginModal(true));
      });
    }
  },[is_login])

  useEffect(() => {
    if (inView && pageNumber !== 0) {
      setPageNumber((pageNumber) => pageNumber + 1);
      // 스크롤 다운 시 페이지넘버 1씩 증가
      const _category = filter.length === 0 ? 'all' : filter.join('|').split('').map((a) => {
                if (a === '&') return '%26';
                if (a === '/') return '%2F';
                return a;
              }).join('');
      const _topic = topic.length === 0 ? 'all' : topic.join('|').split('').map((a) => (a === '&' ? '%26' : a)).join('');
      const _my_script = my_script ? 'ok' : '';
      dispatch(
        scriptActions.setFilterListDB(_category, _topic, pageNumber + 1, _my_script, true)
      ).then((res) => {
        // 무한스크롤 불러오는 경우에 true
        if (res === 'no') {
          setPageNumber(0);
          // 더 이상 불러올 스크립트 없을 때 'no'로 response 받아옴
        }
      });
    }
  }, [inView]);

  const scrollRef = useRef();

  const dispatch = useDispatch();

  const filter_list = useSelector((state) => state.script.filter_list);

  useEffect(() => {
    if (filter_list !== []) {
      dispatch(scriptActions.setFilterList([]));
    }
  }, []);

  const addFilter = (e) => {
    if (reset) setReset(false);
    const idx = filter.indexOf(e.target.innerText);
    if (idx === -1) {
      setFilter((list) => list.concat(e.target.innerText));
    } else if (idx !== -1) {
      setFilter((list) => list.filter((a) => a !== e.target.innerText));
    }
  };
  // const addFilterOverlap = (e) => {
  //   if (reset) setReset(false);
  //   if (filter.indexOf('1Agree / Disagree') === -1) {
  //     setFilter((list) => list.concat('1Agree / Disagree'));
  //     return;
  //   } else {
  //     setFilter((list) => list.filter((a) => a !== '1Agree / Disagree'));
  //     return;
  //   }
  // };
  const addTopic = (e) => {
    if (reset) setReset(false);
    const idx = topic.indexOf(e.target.innerText);
    if (idx === -1) {
      setTopic((list) => list.concat(e.target.innerText));
    } else if (idx !== -1) {
      setTopic((list) => list.filter((a) => a !== e.target.innerText));
    }
  };

  const FilterList = () => {
    setDone(true);
    setReset(true);
    setPageNumber(1); // 첫페이지 넘버값 1로 설정한것 넣어줌
    const _category = filter.length === 0 ? 'all' : filter.join('|').split('').map((a) => {
              if (a === '&') return '%26';
              if (a === '/') return '%2F';
              return a;
            }).join('');
    const _topic = topic.length === 0 ? 'all' : topic.join('|').split('').map((a) => (a === '&' ? '%26' : a)).join('');
    const _my_script = my_script ? 'ok' : '';

    dispatch(scriptActions.setFilterListDB(_category, _topic, 1, _my_script, false));
    setDone(false);
    scrollRef.current.scrollTo(0, 0);
  };

  const selectReset = () => {
    setFilter([]);
    setTopic([]);
    setMyScript(false);
    setReset(false);
  };

  const selectMyScript = () => {
    setMyScript(!my_script);
    setReset(false);
  }

  return (
    <>
      <FilteringWrapper>
        <FilteringLeft>
          <FilteringTitle>
            <h2>Filtering</h2>
            <p>원하는 조건을 모두 선택해주세요!</p>
          </FilteringTitle>
          <FilteringLeftInner>
            <FilteringBox>
              <div>
                <FilteringBoxTitle>TOFEL</FilteringBoxTitle>
                <ul>
                  <li
                    className={
                      filter.indexOf('Agree / Disagree') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Agree / Disagree</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Multiple Choice') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Multiple Choice</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Paired Choice') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Paired Choice</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Good Idea') !== -1 ? 'filter-checked' : ''
                    }
                  >
                    <span onClick={addFilter}>Good Idea</span>
                  </li>
                </ul>
              </div>
              <div>
                <FilteringBoxTitle>IELTS</FilteringBoxTitle>
                <ul>
                  <li
                    className={
                      filter.indexOf('Agree / Disagree') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Agree / Disagree</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Both views') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Both views</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Advantage / Disadvantage') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Advantage / Disadvantage</span>
                  </li>
                  <li
                    className={
                      filter.indexOf('Problem & Solution') !== -1
                        ? 'filter-checked'
                        : ''
                    }
                  >
                    <span onClick={addFilter}>Problem &amp; Solution</span>
                  </li>
                </ul>
              </div>
            </FilteringBox>
            <FilteringBox>
              <FilteringBoxTitle>ARTICLE</FilteringBoxTitle>
              <ul>
                <li
                  className={
                    filter.indexOf('The New York Times') !== -1
                      ? 'filter-checked'
                      : ''
                  }
                >
                  <span onClick={addFilter}>The New York Times</span>
                </li>
                <li
                  className={
                    filter.indexOf('National Geographic') !== -1
                      ? 'filter-checked'
                      : ''
                  }
                >
                  <span onClick={addFilter}>National Geographic</span>
                </li>
                <li
                  className={
                    filter.indexOf('The Korea Times') !== -1
                      ? 'filter-checked'
                      : ''
                  }
                >
                  <span onClick={addFilter}>The Korea Times</span>
                </li>
              </ul>
            </FilteringBox>
            <FilteringBox>
              <FilteringBoxTitle>TOPIC</FilteringBoxTitle>
              <ul>
                <li
                  className={
                    topic.indexOf('National(Korea)') !== -1
                      ? 'filter-checked'
                      : ''
                  }
                >
                  <span onClick={addTopic}>National(Korea)</span>
                </li>
                <li
                  className={
                    topic.indexOf('Health') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>Health</span>
                </li>
                <li
                  className={
                    topic.indexOf('World') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>World</span>
                </li>
                <li
                  className={
                    topic.indexOf('Culture') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>Culture</span>
                </li>
                <li
                  className={
                    topic.indexOf('Science & Technology') !== -1
                      ? 'filter-checked'
                      : ''
                  }
                >
                  <span onClick={addTopic}>Science &amp; Technology</span>
                </li>
                <li
                  className={
                    topic.indexOf('Economics') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>Economics</span>
                </li>
                <li
                  className={
                    topic.indexOf('Sports') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>Sports</span>
                </li>
                <li
                  className={
                    topic.indexOf('Travel') !== -1 ? 'filter-checked' : ''
                  }
                >
                  <span onClick={addTopic}>Travel</span>
                </li>
              </ul>
            </FilteringBox>
            <FilteringBox last>
              <SavedCheck>
                <CheckBox on={my_script && 'on'} onClick={selectMyScript}>
                  <svg width='22' height='16'viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M2 5.66667L9.2 13L20 2' stroke='white' strokeWidth='4' strokeLinecap='round'/>
                  </svg>
                </CheckBox>
                <div>내가 저장한 스크립트만 보기</div>
              </SavedCheck>
            </FilteringBox>
          </FilteringLeftInner>
          {reset ? (
            <FilteringResetButton onClick={selectReset}>
              초기화
              <svg
                viewBox='0 0 16 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2 11C2 9.35 2.67 7.85 3.76 6.76L2.34 5.34C0.9 6.79 0 8.79 0 11C0 15.08 3.05 18.44 7 18.93V16.91C4.17 16.43 2 13.97 2 11ZM16 11C16 6.58 12.42 3 8 3C7.94 3 7.88 3.01 7.82 3.01L8.91 1.92L7.5 0.5L4 4L7.5 7.5L8.91 6.09L7.83 5.01C7.89 5.01 7.95 5 8 5C11.31 5 14 7.69 14 11C14 13.97 11.83 16.43 9 16.91V18.93C12.95 18.44 16 15.08 16 11Z'
                  fill='white'
                />
              </svg>
            </FilteringResetButton>
          ) : (
            <FilteringCompleteButton onClick={FilterList}>
              선택완료
            </FilteringCompleteButton>
          )}
        </FilteringLeft>
        <FilteringRight ref={scrollRef}>
          {filter_list !== 'no' &&
            !done &&
            filter_list.map((a, i) => {
              if (filter_list.length - 1 === i) {
                return <ScriptItem key={i} {...a} _ref={ref} />; // inView ref 넣어줌
              }
              return <ScriptItem key={i} {...a} />;
            })}
          {filter_list === 'no' && !done && (
            <>
              <FilteringResultNone>
                필터링 결과가 없습니다.
              </FilteringResultNone>
              <FilteringResultSentence>
                앞으로 더 많은 스크립트가 더 추가될 예정입니다.
              </FilteringResultSentence>
            </>
          )}
          {done && (
            <>
              <ScriptItemLoading />
              <ScriptItemLoading />
              <ScriptItemLoading />
            </>
          )}
        </FilteringRight>
      </FilteringWrapper>
    </>
  );
};

export default ScriptFiltering;
