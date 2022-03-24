const _REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const _REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const REST_API_KEY = _REST_API_KEY;
const REDIRECT_URI = _REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
