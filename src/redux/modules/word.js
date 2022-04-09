import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/apis';
import { alertNewWhite } from '../../shared/alert';

const SET_DICT = 'SET_DICT';
const ADD_DICT = 'ADD_DICT';
const EDIT_DICT = 'EDIT_DICT';
const DELETE_DICT = 'DELETE_DICT';
const UP_LIKE = 'UP_LIKE';
const DOWN_LIKE = 'DOWN_LIKE';
const UP_DISLIKE = 'UP_DISLIKE';
const DOWN_DISLIKE = 'DOWN_DISLIKE';

const SAVE_DICT = 'SAVE_DICT';
const LOAD_DICT = 'LOAD_DICT';
const LOAD_ALLDICT = 'LOAD_ALLDICT';
const DELETE_MYDICT = 'DELETE_MYDICT';

const setDict = createAction(SET_DICT, (dict_list) => ({ dict_list }));
const addDict = createAction(ADD_DICT, (dict) => ({ dict }));
const editDict = createAction(EDIT_DICT, (dict, word_id) => ({
  dict,
  word_id,
}));
const deleteDict = createAction(DELETE_DICT, (word_id) => ({ word_id }));
const upLike = createAction(UP_LIKE, (word_id) => ({ word_id }));
const downLike = createAction(DOWN_LIKE, (word_id) => ({ word_id }));
const upDislike = createAction(UP_DISLIKE, (word_id) => ({ word_id }));
const downDislike = createAction(DOWN_DISLIKE, (word_id) => ({ word_id }));

const saveDict = createAction(SAVE_DICT, (dict) => ({ dict }));
const loadDict = createAction(LOAD_DICT, (dict_list2) => ({ dict_list2 }));
const loadAllDict = createAction(LOAD_ALLDICT, (dict_list2) => ({
  dict_list2,
}));
const deleteMyDict = createAction(DELETE_MYDICT, (script_id, word) => ({
  script_id,
  word,
}));

const initialState = {
  dict_list: [],
  dict_list2: [],
};

const setDictDB = (script_id, word) => {
  return async function (dispatch, getState, { history }) {
    try {
      const word_list = await apis.setDicts(script_id, word);

      if (word_list.data.ok) {
        dispatch(setDict(word_list.data.opendict));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const setDictUserDB = (script_id, word) => {
  return async function (dispatch, getState, { history }) {
    try {
      const word_list = await apis.setDictUser(script_id, word);

      if (word_list.data.ok) {
        dispatch(setDict(word_list.data.opendict));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const addDictDB = (script_id, word, meaning) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log(script_id, word, meaning);
      const word_data = await apis.addDict(script_id, word, meaning);
      console.log(word_data.data);
      if (word_data.data.ok) {
        const nick = getState().user.user.nickname;

        const doc = {
          dislikeCount: 0,
          likeCount: 0,
          meaning: meaning,
          nickname: nick,
          wordId: word_data.data.wordId,
        };

        dispatch(addDict(doc));
        return word_data.data.isSavedMydict;
      } else {
        alertNewWhite(word_data.data.errorMessage);
        return true;
      }
    } catch (err) {
      console.log(err);
      console.log(err.name);
      alertNewWhite('단어 뜻을 추가하지 못했습니다.');
    }
  };
};

const editDictDB = (script_id, word, word_id, meaning) => {
  console.log(word);
  return async function (dispatch, getState, { history }) {
    try {
      const word_data = await apis.editDict(script_id, word, word_id, meaning);
      console.log(word_data.data);
      if (word_data.data.ok) {
        dispatch(editDict(meaning, word_id));
        return word_data.data.isSavedMydict;
      } else {
        alertNewWhite(word_data.data.errorMessage);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteDictDB = (script_id, word, word_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const word_data = await apis.deleteDict(script_id, word, word_id);
      console.log(word_data.data);
      if (word_data.data.ok) {
        dispatch(deleteDict(word_id));
      } else {
        alertNewWhite(word_data.data.errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const upLikeDB = (script_id, word_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const like = await apis.upLike(script_id, word_id);
      console.log(like.data);
      if (like.data.ok) {
        dispatch(upLike(word_id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const downLikeDB = (script_id, word_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const like = await apis.downLike(script_id, word_id);
      console.log(like.data);
      if (like.data.ok) {
        dispatch(downLike(word_id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const upDislikeDB = (script_id, word_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const like = await apis.upDislike(script_id, word_id);
      console.log(like.data);
      if (like.data.ok) {
        dispatch(upDislike(word_id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const downDislikeDB = (script_id, word_id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const like = await apis.downDislike(script_id, word_id);
      console.log(like.data);
      if (like.data.ok) {
        dispatch(downDislike(word_id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const saveDictDB = (script_id, word, sentence) => {
  return async function (dispatch) {
    try {
      const save_word = await apis.saveDict(script_id, word, sentence);
      if (save_word.data.ok) {
        const doc = {
          script_id,
          word,
          sentence,
        };
        dispatch(saveDict(doc));
        alertNewWhite('나만의 단어장에 단어가 등록되었습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const loadDictDB = () => {
  return async function (dispatch) {
    try {
      const load_dict = await apis.loadDict();
      const load_dicts = load_dict.data.mydict;
      let dicts = [];

      load_dicts?.forEach((doc) => {
        dicts.push({ ...doc });
      });
      dispatch(loadDict(dicts));
    } catch (err) {
      console.log(err);
    }
  };
};

const loadAllDictDB = () => {
  return async function (dispatch) {
    try {
      const load_alldict = await apis.loadAllDict();
      const load_alldicts = load_alldict.data.mydict;

      dispatch(loadAllDict(load_alldicts));
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteMyDictDB = (script_id, word) => {
  return async function (dispatch) {
    try {
      const new_mydict = await apis.deleteMyDict(script_id, word);
      dispatch(deleteMyDict(script_id, word));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = action.payload.dict_list;
      }),
    [ADD_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = [...draft.dict_list, action.payload.dict];
      }),
    [EDIT_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list.map((a) => {
          if (a.wordId === action.payload.word_id) {
            console.log(action.payload.meaning);
            a.meaning = action.payload.dict;
          }
          return a;
        });
      }),
    [DELETE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list.filter(
          (a) => a.wordId !== action.payload.word_id
        );
      }),
    [UP_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list
          .map((a) => {
            if (a.wordId === action.payload.word_id) {
              a.isLike = true;
              a.likeCount++;
              if (a.isDisLike) {
                a.isDisLike = false;
                a.dislikeCount--;
              }
            }
            return a;
          })
          .sort(
            (a, b) =>
              b.likeCount - b.dislikeCount - (a.likeCount - a.dislikeCount)
          );
      }),
    [DOWN_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list
          .map((a) => {
            if (a.wordId === action.payload.word_id) {
              a.isLike = false;
              a.likeCount--;
            }
            return a;
          })
          .sort(
            (a, b) =>
              b.likeCount - b.dislikeCount - (a.likeCount - a.dislikeCount)
          );
      }),
    [UP_DISLIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list
          .map((a) => {
            if (a.wordId === action.payload.word_id) {
              a.isDisLike = true;
              a.dislikeCount++;
              if (a.isLike) {
                a.isLike = false;
                a.likeCount--;
              }
            }
            return a;
          })
          .sort(
            (a, b) =>
              b.likeCount - b.dislikeCount - (a.likeCount - a.dislikeCount)
          );
      }),
    [DOWN_DISLIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list = draft.dict_list
          .map((a) => {
            if (a.wordId === action.payload.word_id) {
              a.isDisLike = false;
              a.dislikeCount--;
            }
            return a;
          })
          .sort(
            (a, b) =>
              b.likeCount - b.dislikeCount - (a.likeCount - a.dislikeCount)
          );
      }),

    [SAVE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list2 = [...draft.dict_list2, action.payload.dict];
        console.log(draft.dict_list2);
      }),

    [LOAD_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list2 = action.payload.dict_list2;
      }),

    [LOAD_ALLDICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list2 = action.payload.dict_list2;
      }),

    [DELETE_MYDICT]: (state, action) =>
      produce(state, (draft) => {
        draft.dict_list2 = draft.dict_list2.filter((a) => {
          console.log(a[2], a[4]);
          return (
            a[2] !== action.payload.word || a[4] !== action.payload.script_id
          );
        });
      }),
  },
  initialState
);

const actionCreators = {
  setDict,
  addDict,
  editDict,
  deleteDict,
  upLike,
  downLike,
  upDislike,
  downDislike,
  setDictDB,
  setDictUserDB,
  addDictDB,
  editDictDB,
  deleteDictDB,
  upLikeDB,
  downLikeDB,
  upDislikeDB,
  downDislikeDB,
  saveDict,
  saveDictDB,
  loadDict,
  loadDictDB,
  loadAllDict,
  loadAllDictDB,
  deleteMyDict,
  deleteMyDictDB,
};

export { actionCreators };
