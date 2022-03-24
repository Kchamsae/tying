import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const DIVIDE_PARAGRAPH = 'DIVIDE_PARAGRAPH';
const SET_CURRENT_DIVIDED = 'SET_CURRENT_DIVIDED';
const SET_CURRENT_STATE = 'SET_CURRENT_PLACE';

const divideParagraph = createAction(DIVIDE_PARAGRAPH, (paragraph_height) => ({
  paragraph_height,
}));
const setCurrentDivided = createAction(
  SET_CURRENT_DIVIDED,
  (current_divided) => ({ current_divided })
);
const setCurrentState = createAction(SET_CURRENT_STATE, (current_state) => ({
  current_state,
}));

const initialState = {
  divided_num: [],
  current_divided: 0,
  current_state: false,
};

export default handleActions(
  {
    [DIVIDE_PARAGRAPH]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.paragraph_height);
        draft.divided_num = action.payload.paragraph_height.map((a) => {
          if (a % 120 === 0) {
            return a / 120;
          } else return Math.ceil(a / 120);
        });
      }),
    [SET_CURRENT_DIVIDED]: (state, action) =>
      produce(state, (draft) => {
        draft.current_divided = action.payload.current_divided;
      }),
  },
  initialState
);

const actionCreators = {
  divideParagraph,
  setCurrentDivided,
};

export { actionCreators };
