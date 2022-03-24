import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as scriptActions } from "../redux/modules/script";
import ScriptItem from "../components/ScriptItem";
import ScriptItemLoading from "../components/ScriptItemLoading";
import { useInView } from "react-intersection-observer";

const Search = () => {
  const searchRef = useRef();
  const [done, setDone] = useState(false);

  // 무한 스크롤 구현부
  const [pageNumber, setPageNumber] = useState(1); //첫페이지 넘버값 1

  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const search_list = useSelector((state) => state.script.search_list);

  useEffect(() => {
    if (search_list !== []) {
      dispatch(scriptActions.setSearchList([]));
    }
  }, []);

  useEffect(() => {
    if (inView && pageNumber !== 0) {
      setPageNumber((pageNumber) => pageNumber + 1);
      // 스크롤 다운 시 페이지넘버 1씩 증가
      dispatch(scriptActions.setSearchListDB(pageNumber + 1, searchRef.current.value, true)).then(
        (res) => {
          // 무한스크롤 불러오는 경우에 true (검색 시 검색결과 기존 리스트에 추가)
          if (res === "no") {
            setPageNumber(0);
            // 더 이상 불러올 스크립트 없을 때 'no'로 response 받아옴
          }
        }
      );
    }
  }, [inView]);

  const searchScript = () => {
    setDone(true);
    setPageNumber(1)
    const v = searchRef.current.value;
    let reg = /^[A-z]{2,}$/;
    const ok = reg.test(v);
    if (ok) {
      dispatch(scriptActions.setSearchListDB(1, v, false));
      // 새로 검색할 시 검색결과 바꿔줘야 함으로 false
    } else if (!ok) {
      alert('두글자 이상의 영문으로만 검색하실 수 있습니다.')
    }
    setDone(false);
  };

  return (
    <>
      <SearchWrapper>
        <div className="search-bar">
          <input type="text" placeholder="Search keywords..." ref={searchRef} />
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
    width: 836px;
    height: 66px;
    margin: 0 auto;
    background: #ffffff;
    border: 3px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 63px;
    position: relative;

    > input {
      height: 60px;
      border: 0;
      appearance: none;
      outline: none;
      padding: 0 0 0 73px;
      background-color: transparent;
      font-size: 30px;
      line-height: 60px;
      font-family: "Noto Sans KR";

      &::placeholder {
        color: #bdbdbd;
      }
    }

    .search-button {
      position: absolute;
      top: calc(50% - 33px);
      right: -1px;
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background-color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      > svg {
        width: 26.18px;
        height: 26.18px;
      }
    }
  }

  .search-result {
    width: 1144px;
    margin: 72px auto;
    

    .filtering-result-none {
      width: max-content;
      margin: 20px auto;
      font-family: "Noto Sans KR";
      font-size: 20px;
      font-weight: 600;
    }
    .filtering-result-sentence {
      width: max-content;
      margin: 0 auto;
      font-family: "Noto Sans KR";
      font-size: 14px;
      font-weight: 300;
    }
  }
`;

export default Search;
