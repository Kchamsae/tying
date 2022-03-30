import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as scriptActions } from "../redux/modules/script";
import { actionCreators as userActions } from "../redux/modules/user";
import ScriptItem from "../components/ScriptItem";
import ScriptItemLoading from "../components/ScriptItemLoading";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { alertNew } from "../shared/alert";

const Search = () => {
  const searchRef = useRef();
  const [done, setDone] = useState(false);

  // 무한 스크롤 구현부
  const [pageNumber, setPageNumber] = useState(1); //첫페이지 넘버값 1

  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const search_list = useSelector((state) => state.script.search_list);

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
    if (search_list !== []) {
      dispatch(scriptActions.setSearchList([]));
    }
  }, []);

  useEffect(() => {
    if (inView && pageNumber !== 0) {
      setPageNumber((pageNumber) => pageNumber + 1);
      // 스크롤 다운 시 페이지넘버 1씩 증가
      dispatch(
        scriptActions.setSearchListDB(
          pageNumber + 1,
          searchRef.current.value,
          true
        )
      ).then((res) => {
        // 무한스크롤 불러오는 경우에 true (검색 시 검색결과 기존 리스트에 추가)
        if (res === "no") {
          setPageNumber(0);
          // 더 이상 불러올 스크립트 없을 때 'no'로 response 받아옴
        }
      });
    }
  }, [inView]);

  const searchScript = () => {
    setDone(true);
    setPageNumber(1);
    const v = searchRef.current.value;
    let reg = /^[a-zA-Z][a-zA-z-]{1,}/;
    const ok = reg.test(v);
    if (ok) {
      dispatch(scriptActions.setSearchListDB(1, v, false));
      // 새로 검색할 시 검색결과 바꿔줘야 함으로 false
    } else if (!ok) {
      alertNew("두글자 이상의 영문으로만 검색하실 수 있습니다.");
    }
    setDone(false);
  };

  return (
    <>
      <SearchWrapper>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search keywords..."
            ref={searchRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchScript();
              }
            }}
          />
          <div className="search-button" onClick={searchScript}>
            <svg
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        <div className="search-result">
          {search_list !== "no" &&
            !done &&
            search_list?.map((a, i) => {
              if (search_list.length - 1 === i) {
                return <ScriptItem key={i} {...a} _ref={ref} />; // inView ref 넣어줌
              }
              return <ScriptItem key={i} {...a} />;
            })}
          {search_list === "no" && !done && (
            <>
              <div className="filtering-result-none">검색 결과가 없습니다.</div>
              <div className="filtering-result-sentence">
                앞으로 더 많은 스크립트가 더 추가될 예정입니다.
              </div>
            </>
          )}
          {done && (
            <>
              <ScriptItemLoading />
              <ScriptItemLoading />
              <ScriptItemLoading />
            </>
          )}
        </div>
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div`
  background-color: #f9f9f9;
  .search-bar {
    width: 43.54vw;
    height: 3.44vw;
    margin: 0 auto;
    background: #ffffff;
    border: 0.16vw solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 3.28vw;
    position: relative;

    > input {
      height: 3.13vw;
      border: 0;
      appearance: none;
      outline: none;
      padding: 0 0 0 3.8vw;
      background-color: transparent;
      font-size: 1.56vw;
      line-height: 3.13vw;
      font-family: "Noto Sans KR";

      &::placeholder {
        color: #bdbdbd;
      }
    }

    .search-button {
      position: absolute;
      top: calc(50% - 1.72vw);
      right: -0.05vw;
      width: 3.44vw;
      height: 3.44vw;
      border-radius: 50%;
      background-color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      > svg {
        width: 1.36vw;
        height: 1.36vw;
      }
    }
  }

  .search-result {
    width: 59.58vw;
    margin: 3.75vw auto;
    padding-bottom: 2.6vw;

    .filtering-result-none {
      width: max-content;
      margin: 1.04vw auto;
      font-family: "Noto Sans KR";
      font-size: 1.04vw;
      font-weight: 600;
    }
    .filtering-result-sentence {
      width: max-content;
      margin: 0 auto;
      font-family: "Noto Sans KR";
      font-size: 0.73vw;
      font-weight: 300;
    }
  }
`;

export default Search;
