import React from 'react';
import styled from 'styled-components';

const NotFound = (props) => {
    const {history} = props;
    return (
        <>
            <NotFoundWrapper>
                <NotFoundTitle>
                    <div>404</div>
                    <div>Not Found</div>
                </NotFoundTitle>
                <NotFoundSentence>
                    <p>찾을 수 없는 페이지 입니다.</p>
                    <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :(</p>
                </NotFoundSentence>
                <MoveHomeButton onClick={()=>history.replace('/')}>홈으로 이동</MoveHomeButton>
            </NotFoundWrapper>
        </>
    );
};

const NotFoundWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 105px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const NotFoundTitle = styled.div`
    margin-top: -200px;
    letter-spacing: -0.017em;
    text-align: center;

    >div:first-of-type{
        font-weight: 700;
        font-size: 160px;
    }
    >div:last-of-type{
        margin-top: -60px;
        font-weight: 500;
        font-size: 48px;
        color: #FF2E00;
    }
`;

const NotFoundSentence = styled.div`
    font-family: 'Noto Sans KR';
    text-align: center;
    font-weight: 500;
    font-size: 25px;
    line-height: 38px;
    letter-spacing: -0.017em;
    margin-top: 50px;
    >p{
        margin: 0;
    }
`;

const MoveHomeButton = styled.button`
    border: 0;
    outline: 0;
    display: block;
    width: 294px;
    height: 70.56px;
    background: #000000;
    border-radius: 63px;
    margin-top: 140px;

    font-family: 'Noto Sans';
    font-weight: 700;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.015em;
    color: #FFFFFF;
    cursor: pointer;
`;
export default NotFound;