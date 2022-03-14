import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import axios from 'axios';

const SET_ONE_SCRIPT = 'SET_ONE_SCRIPT';

const setOneScript = createAction(SET_ONE_SCRIPT, (script) => ({script}));

const initialState = {
    typing_script:{},
}

const setOneScriptDB = (script_id) => {
    console.log('테스트')
    return async function(dispatch, getState, {history}){
        try{
            console.log('테스트')
            const get_one = await axios.get(`http://13.209.69.234/api/detail/${script_id}`);

            console.log(get_one.data);

            dispatch(setOneScript(get_one.data.script));
        }catch(err){
            console.log(err);
            alert('스크립트를 불러오지 못했습니다!')
        }
    }
}

export default handleActions({
    [SET_ONE_SCRIPT]: (state, action) => produce(state, (draft) => {
        draft.typing_script = action.payload.script;
    })
},initialState);

const actionCreators = {
    setOneScript,
    setOneScriptDB,
}

export {actionCreators};