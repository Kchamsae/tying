import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/apis';

const RECORD_TYPING = 'RECORD_TYPING';

const recordTyping = createAction(RECORD_TYPING, (record) => ({ record }));

const recordTypingDB = (
  scriptId,
  scriptType,
  duration,
  time,
  typingCnt,
  speed,
  progress
) => {
  return async function (dispatch, getState, { history }) {
    try {
      const doc = {
        scriptId,
        scriptType,
        duration,
        time,
        typingCnt,
        speed,
        progress,
      };
      const record = await apis.recordTyping(doc);

      console.log(record);
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default handleActions({}, initialState);

const actionCreators = {
  recordTypingDB,
};

export { actionCreators };
