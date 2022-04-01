import React from 'react';
import { history } from '../../redux/configureStore';
import Bookmark from '../Bookmark';
import { 
  ScriptItemWrapper,
  ItemHeader,
  ItemCategory,
  ItemHashtag,
  ItemTitle,
  ItemPreview,
 } from './style';

const ScriptItem = (props) => {
  return (
    <>
      <ScriptItemWrapper
        onClick={() => {
          history.replace(`/typing/${props.scriptId}`);
        }}
      >
        <Bookmark bookmark={props.scripts} script_id={props.scriptId}/>
        <ItemHeader>
          <ItemCategory>{props.scriptType}</ItemCategory>
          <ItemHashtag>
            <div>#{props.scriptCategory}</div>
            {props.scriptTopic.map((a, i) => {
              return <div key={i}>#{a}</div>;
            })}
          </ItemHashtag>
        </ItemHeader>
        <ItemTitle>{props.scriptTitle}</ItemTitle>
        <ItemPreview ref={props._ref}>
          {props.scriptParagraph[0]}
        </ItemPreview>
      </ScriptItemWrapper>
    </>
  );
};

export default ScriptItem;
