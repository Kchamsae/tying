const REST_API_KEY = "d00f46d50d1323959f6d3ab727721150"

const REDIRECT_URI = "http://localhost:3000/api/kakao/callback"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`