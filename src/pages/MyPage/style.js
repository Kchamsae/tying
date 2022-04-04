import styled from 'styled-components';

const MyPageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 5.47vw);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MyPageTop = styled.div`
  padding-left: 4.17vw;
  box-sizing: border-box;
  flex: 22.47% 0 0;
  display: flex;
  flex-direction: column;
`;

const MyInfo = styled.div`
  flex: 55.6% 0 0;
  display: flex;
  align-items: center;

  > h3 {
    padding-left: 1.77vw;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 1.67vw;
    letter-spacing: -0.015em;
    margin: 0;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 0.57vw;
      height: 2.5vw;
      left: 0;
      top: calc(50% - 1.15vw);

      background: #ff2e00;
      border-radius: 0.105vw;
    }
  }

  > div {
    margin-left: 1.98vw;

    font-family: 'Noto Sans KR';
    font-size: 1.04vw;
    font-weight: 500;
    letter-spacing: -0.015em;
    color: #878889;
    position: relative;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #000;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 1.04vw;
      left: -1.04vw;
      top: calc(50% - 0.47vw);

      border-right: 0.105vw solid #636366;
    }
  }
`;

const TabWrapper = styled.div`
  flex: 44.4% 0 0;
  display: flex;
  align-items: center;
`;

const TabMenu = styled.div`
  height: 2.6vw;
  padding: 0 0.83vw;
  border: 0.105vw solid ${(props) => (props.on ? '#000' : '#878889')};
  border-radius: 3.28vw;
  display: flex;
  align-items: center;
  transition: 0.3s;

  font-family: 'Noto Sans KR';
  font-weight: ${(props) => (props.on ? '600' : '500')};
  font-size: 1.15vw;
  letter-spacing: -0.015em;

  color: ${(props) => (props.on ? '#000' : '#878889')};
  margin-right: 0.63vw;
  cursor: pointer;
`;

const MyPageBody = styled.div`
  padding-top: 2.55vw;
  box-sizing: border-box;
  flex: 77.53% 0 0;
`;

const MyPageTitleWord = styled.div`
  display: flex;
  padding-left: 4.01vw;
  > h3 {
    margin: 0;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1.56vw;
    letter-spacing: -0.015em;
  }

  > div {
    margin: 0.26vw 0 0 1.04vw;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 1.04vw;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    color: #878889;
    cursor: pointer;

    > svg {
      margin: 0.105vw 0 0 0.36vw;
      width: 0.57vw;
      height: 0.83vw;
    }
  }
`;

const MyPageTitleCertificate = styled(MyPageTitleWord)`
  > div {
    font-weight: 600;
    font-size: 1.56vw;
    letter-spacing: -0.015em;
    color: #000;
    margin: 0 0 0 2.08vw;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 0.105vw;
      height: 1.77vw;
      position: absolute;
      left: -1.04vw;
      top: calc(50% - 0.78vw);
      border-radius: 0.05vw;
      background-color: #636366;
    }
  }
`;

const MyPageCalendar = styled.div`
  box-sizing: border-box;
  flex: 77.53% 0 0;
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
  MyPageCalendar,
};
