import { KAKAO_AUTH_URL } from "./Kakao";
import kakaoBtn from "../static/kakaoBtn.png"


function OAuth() {
//let 변수명 = new URL(window.location.href).searchParams.get('code')
console.log(KAKAO_AUTH_URL)



return (
<a href={KAKAO_AUTH_URL}>
	<img src={kakaoBtn} alt="카카오 버튼"></img>
	<span>카카오계정 로그인</span>
</a>
);
}

export default OAuth;