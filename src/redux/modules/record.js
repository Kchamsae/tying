import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/apis';

const RECORD_TYPING = 'RECORD_TYPING';
const RECORD_LOAD = 'RECORD_LOAD';
const RECORD_LOADALL = 'RECORD_LOADALL';
const CERTIFICATE_LOAD = 'CERTIFICATE_LOAD';

const recordLoad = createAction(RECORD_LOAD, (record_list) => ({
  record_list,
}));

const recordLoadAll = createAction(RECORD_LOADALL, (record_list2) => ({
  record_list2,
}));

const certificateLoad = createAction(CERTIFICATE_LOAD, (certificate) => ({
  certificate,
}));

const initialState = {
  record_list: [],
  record_list2: [],
  my_certificate: {},
};

const recordTypingDB = (
  scriptId,
  scriptTitle,
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
        scriptTitle,
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

const recordLoadDB = () => {
  return async function (dispatch) {
    try {
      const record_load = await apis.recordLoad();
      const record_loads = record_load.data.getcertificate;

      dispatch(recordLoad(record_loads));
    } catch (err) {
      console.log(err);
    }
  };
};

// 시작일과 마지막일까지의 저장된 데이터 받아오기
const recordLoadAllDB = (startdate, enddate) => {
  return async function (dispatch) {
    try {
      const record_loadall = await apis.recordLoadAll(startdate, enddate);
      dispatch(recordLoadAll(record_loadall.data.getrecord));
    } catch (err) {
      console.log(err);
    }
  };
};

const certificateLoadDB = (certificateId, scriptId) => {
  return async function (dispatch) {
    try {
      const load_certificate = await apis.certificateLoad(
        certificateId,
        scriptId
      );
      const load_certificates = load_certificate.data;

      if (load_certificates.ok) {
        const doc = {
          ...load_certificates.getcertificatedetail,
          scriptTopic: load_certificates.scriptTopic,
          scriptCategory: load_certificates.scriptCategory,
        };
        dispatch(certificateLoad(doc));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [RECORD_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.record_list = action.payload.record_list;
      }),

    [RECORD_LOADALL]: (state, action) =>
      produce(state, (draft) => {
        draft.record_list2 = action.payload.record_list2;
      }),

    [CERTIFICATE_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.my_certificate = action.payload.certificate;
      }),
  },
  initialState
);

const actionCreators = {
  recordTypingDB,
  recordLoad,
  recordLoadDB,
  recordLoadAll,
  recordLoadAllDB,
  certificateLoad,
  certificateLoadDB,
};

export { actionCreators };
