import axios from 'axios';
import { getCookie } from './Cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Alter defaults after instance has been created
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use(function (config) {
  const token = getCookie('token');
  config.headers.common['authorization'] = `Bearer ${token}`;
  return config;
});

export const apis = {
  // user
  signup: (signup) => api.post('/api/signup', signup),
  login: (login) => api.post('/api/login', login),
  getLoginUserInfo: () => api.get('/api/auth'),
  kakaoLogin: (code) => api.get(`/api/kakao/callback?code=${code}`),
  editUserNickname: (nickname) => api.put('/api/info', nickname),
  // signup
  idDuplicateCheck: (idCheckF) => api.post('/api/signup/idCheck', idCheckF),
  nicknameDuplicateCheck: (nicknameCheckF) =>
    api.post('/api/signup/nicknameCheck', nicknameCheckF),
  // word
  setDicts: (script_id, word) =>
    api.get(`/opendict/guest/${script_id}/${word}`),
  setDictUser: (script_id, word) =>
    api.get(`/opendict/user/${script_id}/${word}`),
  addDict: (script_id, word, meaning) =>
    api.post(`/opendict/${script_id}/${word}`, { meaning: meaning }),
  editDict: (script_id, word, word_id, meaning) =>
    api.put(`/opendict/${script_id}/${word}/${word_id}`, { meaning: meaning }),
  deleteDict: (script_id, word_id) =>
    api.delete(`/opendict/${script_id}/${word_id}`),
  upLike: (script_id, word_id) =>
    api.put(`/likeDislike/likeUp/${script_id}/${word_id}`),
  downLike: (script_id, word_id) =>
    api.put(`/likeDislike/likeDown/${script_id}/${word_id}`),
  upDislike: (script_id, word_id) =>
    api.put(`/likeDislike/dislikeUp/${script_id}/${word_id}`),
  downDislike: (script_id, word_id) =>
    api.put(`/likeDislike/dislikeDown/${script_id}/${word_id}`),
  saveDict: (script_id, word, sentence) =>
    api.post(`/mydict/${script_id}/${word}`, { sentence: sentence }),
  loadDict: () => api.get('/mydict/some'),
  loadAllDict: () => api.get('/mydict/all'),
  deleteMyDict: (script_id, word) => api.delete(`/mydict/${script_id}/${word}`),
  // script
  filterScript: (category, topic, number) =>
    api.get(
      `/api/script/list?scriptCategory=${category}&scriptTopic=${topic}&page=${number}`
    ),
  searchScript: (number, word) =>
    api.get(`/api/script/search?page=${number}&targetWord=${word}`),
  randomScript: (category, small_category) =>
    api.get(`/api/script/${category}/${small_category}`),
  oneScript: (script_id) => api.get(`/api/detail/${script_id}`),
  getMyScript: (script_id) => api.get(`/api/myScript/${script_id}`),
  addMyScript: (script_id) => api.post(`/api/myScript/${script_id}`),
  deleteMyScript: (script_id) => api.delete(`/api/myScript/${script_id}`),

  // record
  recordTyping: (doc) => api.post('/api/studyrecord', doc),
  recordLoad: () => api.get('/api/mypage/certificate'),
  recordLoadAll: (startdate, enddate) =>
    api.post('/api/mypage/statistic', {
      startdate: startdate,
      enddate: enddate,
    }),
};
