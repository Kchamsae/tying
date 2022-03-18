import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import axios from 'axios';
import { apis } from "../../shared/apis";

const SET_DICT = 'SET_DICT';
const ADD_DICT = 'ADD_DICT';
const EDIT_DICT = 'EDIT_DICT';
const DELETE_DICT = 'DELETE_DICT';

const setDict = createAction(SET_DICT, (dict_list) => ({dict_list}));
const addDict = createAction(ADD_DICT, (dict) => ({dict}));
const editDict = createAction(EDIT_DICT, (dict,word_id) => ({dict,word_id}));
const deleteDict = createAction(DELETE_DICT, (word_id) => ({word_id}));


const initialState = {
    dict_list:[],
}

const setDictDB = (script_id,word) => {
    return async function(dispatch, getState, {history}){
        try{
            const word_list = await axios.get(`http://13.209.69.234/opendict/guest/${script_id}/${word}`)

            if(word_list.data.ok){
                dispatch(setDict(word_list.data.opendict))
            }
        }catch(err){
            console.log(err);
        }
    }
}

const addDictDB = (script_id,word,meaning) => {
    return async function(dispatch, getState, {history}){
        try{
            console.log(script_id,word,meaning)
            const word_data = await apis.addDict(script_id,word,meaning);
            console.log(word_data.data);
            if(word_data.data.ok){
                const nick = getState().user.user.nickname;

                const doc ={
                    dislikeCount: 0,
                    likeCount: 0,
                    meaning: meaning,
                    nickname: nick,
                    wordId: word_data.data.wordId
                }

                dispatch(addDict(doc))
            }
        }catch(err){
            console.log(err);
        }
    }
}

const editDictDB = (script_id,word,word_id,meaning) => {
    return async function(dispatch, getState, {history}){
        try{
            const word_data = await apis.editDict(script_id,word,word_id,meaning);
            console.log(word_data.data);
            if(word_data.data.ok){
                dispatch(editDict(meaning, word_id))
            }
        }catch(err){
            console.log(err);
        }
    }
}

const deleteDictDB = (script_id,word_id) => {
    return async function(dispatch, getState, {history}){
        try{
            const word_data = await apis.deleteDict(script_id,word_id);
            console.log(word_data.data);
            if(word_data.data.ok){
                dispatch(deleteDict(word_id))
            }
        }catch(err){
            console.log(err);
        }
    }
}


export default handleActions({
    [SET_DICT]: (state, action) => produce(state, (draft) => {
        draft.dict_list = action.payload.dict_list;
    }),
    [ADD_DICT]: (state, action) => produce(state, (draft) => {
        draft.dict_list = [...draft.dict_list, action.payload.dict];
    }),
    [EDIT_DICT]: (state, action) => produce(state, (draft) => {
        draft.dict_list = draft.dict_list.map(a=>{
            if(a.wordId === action.payload.word_id){
                console.log(action.payload.meaning)
                a.meaning = action.payload.dict;
            }
            return a;
        });
    }),
    [DELETE_DICT]: (state, action) => produce(state, (draft) => {
        draft.dict_list = draft.dict_list.filter(a=>a.wordId !== action.payload.word_id)
    }),
},initialState);

const actionCreators = {
    setDict,
    addDict,
    editDict,
    deleteDict,
    setDictDB,
    addDictDB,
    editDictDB,
    deleteDictDB,
}

export {actionCreators};