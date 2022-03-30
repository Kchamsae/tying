import React from 'react';
import styled from 'styled-components';
import { history } from './../redux/configureStore';
import Bookmark from './Bookmark';

const ScriptItem = (props) => {
  return (
    <>
      <ScriptItemWrapper
        onClick={() => {
          history.replace(`/typing/${props.scriptId}`);
        }}
      >
        <Bookmark bookmark={props.scripts} script_id={props.scriptId}/>
        <div className='item-header'>
          <div className='item-category'>{props.scriptType}</div>
          <div className='item-hashtag'>
            <div>#{props.scriptCategory}</div>
            {props.scriptTopic.map((a, i) => {
              return <div key={i}>#{a}</div>;
            })}
          </div>
        </div>
        <div className='item-title'>{props.scriptTitle}</div>
        <div className='item-preview' ref={props._ref}>
          {props.scriptParagraph[0]}
        </div>
      </ScriptItemWrapper>
    </>
  );
};

const ScriptItemWrapper = styled.div`
  width: 59.58vw;
  height: 11.75vw;
  background: #efefef;
  border-radius: 1.04vw;
  position: relative;
  box-sizing: border-box;
  padding: 0 3.8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.93vw 0;
  cursor: pointer;
  .bookmark-button {
    position: absolute;
    top: -0.89vw;
    right: 2.08vw;
    height: min-content;
    cursor: pointer;

    svg {
      fill: #d8d8d8;
    }

    .bookmark-innershadow {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 1.41vw;
      height: 1.82vw;
      border-radius: 0.21vw;
      box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
  }

  .item-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.78vw;
    .item-category {
      font-family: 'Montserrat';
      font-weight: 800;
      font-size: 2.5vw;
      letter-spacing: -0.015em;
      margin-right: 1.46vw;
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 0.36vw;
        height: 2.5vw;
        left: -1.09vw;
        top: 0.26vw;
        background: #ff2e00;
        border-radius: 0.1vw;
      }
    }
    .item-hashtag {
      display: flex;
      > div {
        font-weight: 500;
        font-size: 0.94vw;
        letter-spacing: -0.015em;

        display: flex;
        align-items: center;
        justify-content: center;

        width: max-content;
        padding: 0 8px;
        height: 2.14vw;
        background: #d2d2d2;
        margin-right: 0.68vw;
      }
    }
  }

  .item-title {
    font-weight: 600;
    font-size: 0.94vw;
    letter-spacing: -0.015em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-bottom: 0.52vw;
  }
  .item-preview {
    font-weight: 400;
    font-size: 0.94vw;
    line-height: 1.3vw;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #949596;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default ScriptItem;
