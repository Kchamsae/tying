import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/apis';

const SET_ONE_SCRIPT = 'SET_ONE_SCRIPT';
const SET_FILTER_LIST = 'SET_FILTER_LIST';
const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
const ADD_FILTER_LIST = 'ADD_FILTER_LIST';
const ADD_SEARCH_LIST = 'ADD_SEARCH_LIST';

const setOneScript = createAction(SET_ONE_SCRIPT, (script) => ({ script }));
const setFilterList = createAction(SET_FILTER_LIST, (list) => ({ list }));
const setSearchList = createAction(SET_SEARCH_LIST, (list) => ({ list }));
const addFilterList = createAction(ADD_FILTER_LIST, (list) => ({ list }));
const addSearchList = createAction(ADD_SEARCH_LIST, (list) => ({ list }));

const initialState = {
  typing_script: {},
  filter_list: [],
  search_list: [],
};

const randomCategoryScriptDB = (category, small_category, reload=false) => {
  return async function (dispatch, getState, { history }) {
    try {
      const random = await apis.randomScript(category, small_category);
      if(!reload){
        dispatch(setOneScript(random.data.script[0]));
        console.log(random.data);
        history.push(`/typing/${random.data.script[0].scriptId}`);
      }else if(reload){
        return random.data.script[0].scriptId;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const setOneScriptDB = (script_id) => {
  console.log('테스트');
  return async function (dispatch, getState, { history }) {
    try {
      const get_one = await apis.oneScript(script_id);

      console.log(get_one.data);

      dispatch(setOneScript(get_one.data.script));

      return {
        length: get_one.data.script.scriptParagraph.length,
        script_id: get_one.data.script.scriptId,
      };
    } catch (err) {
      console.log(err);
      alert('스크립트를 불러오지 못했습니다!');
    }
  };
};

const setFilterListDB = (category, topic, number, scroll) => {
  return async function (dispatch, getState, { history }) {
    try {
      const list = await apis.filterScript(category, topic, number);

      console.log('list.data :', list.data);
      if (list.data.ok && list.data.ok !== 'no') {
        if (list.data.scripts?.length === 0) {
          dispatch(setFilterList('no'));
        } else {
          if (scroll) {
            // 무한스크롤 관련
            dispatch(addFilterList(list.data.scripts));
          } else {
            dispatch(setFilterList(list.data.scripts));
          }
        }
      } else if (list.data.ok === 'no') {
        return 'no';
      }
    } catch (err) {
      console.log(err);
      alert('스크립트를 필터링 하지 못했습니다!');
    }
  };
};

const setSearchListDB = (number, word, scroll) => {
  return async function (dispatch, getState, { history }) {
    try {
      const list = await apis.searchScript(number, word);

      console.log(list.data);
      if (list.data.ok && list.data.ok !== 'no') {
        if (list.data.targetScripts?.length === 0) {
          dispatch(setSearchList('no'));
        } else {
          if (scroll) {
            dispatch(addSearchList(list.data.targetScripts));
          } else {
            dispatch(setSearchList(list.data.targetScripts));
          }
        }
      } else if (list.data.ok === 'no') {
        return 'no';
      }
    } catch (err) {
      console.log(err);
      alert('검색결과를 가져오지 못했습니다!');
    }
  };
};

export default handleActions(
  {
    [SET_ONE_SCRIPT]: (state, action) =>
      produce(state, (draft) => {
        draft.typing_script = action.payload.script;
      }),
    [SET_FILTER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.filter_list = action.payload.list;
      }),
    [SET_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = action.payload.list;
      }),
    [ADD_FILTER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.filter_list = [...draft.filter_list, ...action.payload.list];
        // 배열 안에 있는 리스트 꺼내준다
      }),
    [ADD_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.search_list = [...draft.search_list, ...action.payload.list];
      }),
  },
  initialState
);

const actionCreators = {
  setOneScript,
  setFilterList,
  setSearchList,
  randomCategoryScriptDB,
  setOneScriptDB,
  setFilterListDB,
  setSearchListDB,
};

export { actionCreators };
