import styled from "styled-components";

const MyPageWrapper = styled.div`
width: 100%;
height: calc(100vh - 105px);
overflow: hidden;
display: flex;
flex-direction: column;
`;

const MyPageTop = styled.div`
padding-left: 80px;
box-sizing: border-box;
flex: 22.47% 0 0;
display: flex;
flex-direction: column;
`;

const MyInfo = styled.div`
flex: 55.6% 0 0;
display: flex;
align-items: center;

>h3{
  padding-left: 34px;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 32px;
  letter-spacing: -0.015em;
  margin: 0;
  position: relative;

  &::before{
    content: '';
    display: block;
    position: absolute;
    width: 11px;
    height: 48px;
    left: 0;
    top: calc(50% - 22px);

    background: #FF2E00;
    border-radius: 2px;
  }
}

>div{
  margin-left: 38px;

  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: #878889;
  position: relative;
  cursor: pointer;
  transition: 0.3s;

  &:hover{
    color: #000;
  }

  &::before{
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 20px;
    left: -20px;
    top: calc(50% - 9px);

    border-right: 2px solid #636366;
  }
}

`;

const TabWrapper = styled.div`
flex: 44.4% 0 0;
display: flex;
align-items: center;
`;

const TabMenu = styled.div`
height: 50px;
padding: 0 16px;
border: 2px solid ${props => props.on ? '#000' : '#878889'};
border-radius: 63px;
display: flex;
align-items: center;
transition: 0.3s;

font-family: 'Noto Sans KR';
font-weight: ${props => props.on ? '600' : '500'};
font-size: 22px;
letter-spacing: -0.015em;

color: ${props => props.on ? '#000' : '#878889'};
margin-right: 12px;
cursor: pointer;
`;

const MyPageBody = styled.div`
padding-top: 49px;
box-sizing: border-box;
flex: 77.53% 0 0;
`;

const MyPageTitleWord = styled.div`
  display: flex;
  padding-left: 77px;
  > h3{
    margin: 0;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 30px;
    letter-spacing: -0.015em;
  }

  > div{
    margin: 5px 0 0 20px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #878889;
    cursor: pointer;

    >svg{
      margin: 2px 0 0 7px ;
      width: 11px;
      height: 16px
    }
  }
`;

const MyPageTitleCertificate = styled(MyPageTitleWord)`
    >div{
        font-weight: 600;
        font-size: 30px;
        letter-spacing: -0.015em;
        color: #000;
        margin : 0 0 0 40px;
        position: relative;

        &::before{
            content: '';
            display: block;
            width: 2px;
            height: 34px;
            position: absolute;
            left: -20px;
            top: calc(50% - 15px);
            border-radius: 1px;
            background-color: #636366;
        }
    }
`;

export {
    MyPageWrapper,
    MyPageTop,
    MyInfo,
    TabWrapper,
    TabMenu,
    MyPageBody,
    MyPageTitleWord,
    MyPageTitleCertificate,
}