import styled, { css } from "styled-components";

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
  width: 435px;
  height: 778px;
  border-radius: 20px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 27px;
  position: relative;     
`;

const ModalClose = styled.div`
  width: 17px;
  height: 17px;
  position: absolute;
  top: 18px;
  right: 18px;
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
  background-size: 219px;
  background-position: 44% 61%;
  width: 98px;
  height: 130px;
`;

const ModalTime = styled.div`
  margin: 0 3px 26px 0;
  align-self: flex-end;
  >div{
    margin-top: 5px;
    width: 175px;
    height: 31px;
    background: #FCFCFC;
    border-radius: 19.5px;
    display: flex;
    align-items: center;
    >span:first-of-type{
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.015em;
      display: inline-block;
      width: 67px;
      text-align: center;
      position: relative;
      &::before{
        content: '';
        display: block;
        width: 2px;
        height: 20px;
        border-radius: 1px;
        background-color: #bdbdbd;
        position: absolute;
        right: 0;
        top: calc(50% - 10px);
      }
    }
    >span:last-of-type{
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.015em;
      display: inline-block;
      width: 108px;
      box-sizing: border-box;
      padding-left: 14px;
    }
  }
`;

const ModalTitle = styled.div`
  flex: 7.46% 0 0;
  text-align: left;
  font-family: 'Paytone One';
  font-weight: 400;
  font-size: 28px;
  letter-spacing: -0.015em;
  padding-left: 19px;
  display: flex;
  align-items: center;
  position: relative;
    &::before{
      content: '';
      display: block;
      width: 11px;
      height: 22px;
      background: #FF2E00;
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: calc(50% - 11px)
    }
`;

const ModalBody = styled.div`
  width: 386px;
  height: 486px;
  background: #DFDFDF;
  border-radius: 20px;
  box-sizing: border-box;
  padding-top: 18px;
`;

const ModalTag = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 13px;
  margin: 0;
`;

const ModalTagItem = styled.li`
  height: 24px;
  padding: 0 16px;
  background: #878889;
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: -0.015em;
  margin-right: 7px;
`;

const ModalScriptTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.015em;
  width: 100%;
  box-sizing: border-box;
  padding: 0 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 10px;
`;

const ModalData = styled.div`
  padding: 0 7px;
  margin-top: 17px;
`;

const ModalDataItem = styled.div`
  width: 371px;
  height: 70px;
  box-sizing: border-box;
  padding: 0 22px;
  margin-top: 5px;
  background: #C4C4C4;
  border-radius: 11px;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.08));

  display: flex;
  justify-content: space-between;
  align-items: center;

  >span:first-of-type{
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    display: inline-block;
    padding: 0 15px;
    text-align: center;
    position: relative;

    &::before{
      content: '';
      display: block;
      width: 2px;
      height: 16px;
      border-radius: 1px;
      background-color: #878889;
      position: absolute;
      left: 0;
      top: calc(50% - 8px);
    }
  }

  >span:last-of-type{
    width: 100px;
    font-size: 25px;
    display: flex;
    align-items: center;
    letter-spacing: -0.015em;
    display: inline-block;
    position: relative;

    ${props => {
      if(props.progress){
        return css`
          >span{
            font-size: 15px;
            color: #a5a5a5;
          }
        `;
      }
    }}

    ${props => {
      if(props.timer){
        return css`
          &::before{
            content: 'MIN';
            position: absolute;
            font-size: 10px;
            transform: scale(0.8);
            letter-spacing: -0.015em;
            color: #878889;
            bottom: -5px;
            left: 5px;
          }
          &::after{
            content: 'SEC';
            position: absolute;
            font-size: 5px;
            transform: scale(0.8);
            letter-spacing: -0.015em;
            color: #878889;
            bottom: -5px;
            left: 40px;
          }
        `;
      }
    }}
  }
`;

const ModalNicknameInput = styled.input.attrs(()=>({
  type: 'text',
  placeholder: '닉네임을 입력해주세요',
}))`
  font-family: 'Noto Sans KR';
  border: none;
  outline: none;
  padding: 0 17px;
  width: 189px;
  height: 27px;
  background: #FFFFFF;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-size: 12px;
  letter-spacing: -0.015em;
  color: #000;

  &::placeholder{
    color: #BDBDBD;
  };

`;

const ModalNickname = styled.div`
  height: 63px;
  padding-left: 18px;
  display: flex;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.015em;
  
  >span{
    font-size: 20px;
    color: #bdbdbd;
    margin-right: 7px;
  }
`;

const ModalButton = styled.button`
  padding: 0;
  border: 0;
  outline: 0;
  width: 179px;
  height: 40px;
  margin: auto;
  background: #0B0B0B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;

  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.015em;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  >svg{
    width: 18px;
    height: 17px;
    margin-left: 12px;
  }
`;

export{
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
}