import styled, { css } from 'styled-components';

const CertificateModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 22.66vw;
  height: 40.52vw;
  border-radius: 1.04vw;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1.41vw;
  position: relative;
`;

const ModalClose = styled.div`
  width: 0.89vw;
  height: 0.89vw;
  position: absolute;
  top: 0.94vw;
  right: 0.94vw;
  cursor: pointer;
`;

const ModalTop = styled.div`
  flex: 19.28% 0 0;
  display: flex;
  justify-content: space-between;
`;

const ModalGraphic = styled.div`
  background-image: url(/static/certificate.png);
  background-repeat: no-repeat;
  background-size: 11.41vw;
  background-position: 44% 61%;
  width: 5.1vw;
  height: 6.77vw;
`;

const ModalTime = styled.div`
  margin: 0 0.16vw 1.35vw 0;
  align-self: flex-end;
  > div {
    margin-top: 0.26vw;
    width: 9.11vw;
    height: 1.61vw;
    background: #fcfcfc;
    border-radius: 1.02vw;
    display: flex;
    align-items: center;
    > span:first-of-type {
      font-weight: 700;
      font-size: 0.73vw;
      letter-spacing: -0.015em;
      display: inline-block;
      width: 3.49vw;
      text-align: center;
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 0.105vw;
        height: 1.04vw;
        border-radius: 0.05vw;
        background-color: #bdbdbd;
        position: absolute;
        right: 0;
        top: calc(50% - 0.52vw);
      }
    }
    > span:last-of-type {
      font-weight: 500;
      font-size: 0.73vw;
      letter-spacing: -0.015em;
      display: inline-block;
      width: 5.63vw;
      box-sizing: border-box;
      padding-left: 0.73vw;
    }
  }
`;

const ModalTitle = styled.div`
  flex: 7.46% 0 0;
  text-align: left;
  font-family: 'Paytone One';
  font-weight: 400;
  font-size: 1.46vw;
  letter-spacing: -0.015em;
  padding-left: 0.99vw;
  display: flex;
  align-items: center;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 0.57vw;
    height: 1.15vw;
    background: #ff2e00;
    border-radius: 0.105vw;
    position: absolute;
    left: 0;
    top: calc(50% - 0.57vw);
  }
`;

const ModalBody = styled.div`
  width: 20.1vw;
  height: 25.31vw;
  background: #dfdfdf;
  border-radius: 1.04vw;
  box-sizing: border-box;
  padding-top: 0.94vw;
`;

const ModalTag = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 0.52vw;
  margin: 0;
`;

const ModalTagItem = styled.li`
  height: 1.25vw;
  padding: 0 0.52vw;
  background: #878889;
  border-radius: 1.56vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.63vw;
  letter-spacing: -0.015em;
  margin-right: 0.36vw;
  white-space: nowrap;
`;

const ModalScriptTitle = styled.div`
  font-weight: 700;
  font-size: 1.04vw;
  line-height: 1.41vw;
  letter-spacing: -0.015em;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.94vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.52vw;
`;

const ModalData = styled.div`
  padding: 0 0.36vw;
  margin-top: 0.89vw;
`;

const ModalDataItem = styled.div`
  width: 19.32vw;
  height: 3.65vw;
  box-sizing: border-box;
  padding: 0 1.15vw;
  margin-top: 0.26vw;
  background: #c4c4c4;
  border-radius: 0.57vw;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.08));

  display: flex;
  justify-content: space-between;
  align-items: center;

  > span:first-of-type {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1.04vw;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    display: inline-block;
    padding: 0 0.78vw;
    text-align: center;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 0.1vw;
      height: 0.83vw;
      border-radius: 0.05vw;
      background-color: #878889;
      position: absolute;
      left: 0;
      top: calc(50% - 0.42vw);
    }
  }

  > span:last-of-type {
    width: 5.21vw;
    font-size: 1.3vw;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    display: inline-block;
    position: relative;

    ${(props) => {
      if (props.progress) {
        return css`
          > span {
            font-size: 0.78vw;
            color: #a5a5a5;
          }
        `;
      }
    }}

    ${(props) => {
      if (props.timer) {
        return css`
          &::before {
            content: 'MIN';
            position: absolute;
            font-size: 0.52vw;
            transform: scale(0.8);
            letter-spacing: -0.015em;
            color: #878889;
            bottom: -0.26vw;
            left: 0.26vw;
          }
          &::after {
            content: 'SEC';
            position: absolute;
            font-size: 0.26vw;
            transform: scale(0.8);
            letter-spacing: -0.015em;
            color: #878889;
            bottom: -0.26vw;
            left: 2.08vw;
          }
        `;
      }
    }}
  }
`;

const ModalNicknameInput = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '닉네임을 입력해주세요',
}))`
  font-family: 'Noto Sans KR';
  border: none;
  outline: none;
  padding: 0 0.89vw;
  width: 9.84vw;
  height: 1.41vw;
  background: #ffffff;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0.52vw;

  font-size: 0.63vw;
  letter-spacing: -0.015em;
  color: #000;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const ModalNickname = styled.div`
  height: 3.28vw;
  padding-left: 0.94vw;
  display: flex;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 1.04vw;
  letter-spacing: -0.015em;

  > span {
    font-size: 1.04vw;
    color: #bdbdbd;
    margin-right: 0.36vw;
  }
`;

const ModalButton = styled.button`
  padding: 0;
  border: 0;
  outline: 0;
  width: 9.32vw;
  height: 2.08vw;
  margin: auto;
  background: #0b0b0b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1.56vw;

  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 1.04vw;
  letter-spacing: -0.015em;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > svg {
    width: 0.94vw;
    height: 0.89vw;
    margin-left: 0.63vw;
  }
`;

export {
  CertificateModalWrap,
  Modal,
  ModalClose,
  ModalTop,
  ModalGraphic,
  ModalTime,
  ModalTitle,
  ModalBody,
  ModalTag,
  ModalTagItem,
  ModalScriptTitle,
  ModalData,
  ModalDataItem,
  ModalNicknameInput,
  ModalNickname,
  ModalButton,
};
