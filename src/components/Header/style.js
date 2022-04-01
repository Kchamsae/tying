import styled, { css } from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 5.47vw;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderInner = styled.div`
    width: 94.38vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TyingLogo = styled.div`
    svg {
      width: 5.89vw;
      height: 2.19vw;
      margin-left: 1.41vw;
      cursor: pointer;
    }
`;

const HeaderNav = styled.div`
      display: flex;
      align-items: center;
      margin-right: 1.35vw;
`;

const HeaderNavLoginMenu = styled.div`
        width: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.78vw;
        height: 1.56vw;
        border-radius: 0.78vw;

        font-family: "Noto Sans KR";
        font-weight: 600;
        font-size: 0.73vw;
        letter-spacing: -0.015em;

        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
`;

const HeaderNavScriptMenu = styled.div`
        width: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.78vw;
        height: 1.56vw;
        border-radius: 0.78vw;
        margin-left: 0.16vw;

        font-family: "Noto Sans KR";
        font-weight: 600;
        font-size: 0.73vw;
        letter-spacing: -0.015em;

        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
`;

const HeaderNavIcon = styled.div`
        width: 2.03vw;
        height: 2.03vw;
        border-radius: 50%;
        background: #fefefe;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
        margin-left: 0.89vw;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: #000;
          color: #fefefe;
          svg path {
            fill: #fefefe;
          }
        }

        span {
          font-weight: 700;
          font-size: 0.63vw;
          line-height: 0.83vw;
          letter-spacing: -0.015em;
        }
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(190, 190, 190, 0.91);
  z-index: 1000;
  opacity: 0;
  transition: all 0.125s ease-in 0s;
  animation: 250ms ease 0ms 1 normal forwards running opacityIn;
  @keyframes opacityIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &.fade_out {
    animation: 250ms ease 0ms 1 normal forwards running opacityOut;
  }
  @keyframes opacityOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export {
    HeaderWrapper,
    HeaderInner,
    TyingLogo,
    HeaderNav,
    HeaderNavLoginMenu,
    HeaderNavScriptMenu,
    HeaderNavIcon,
    ModalBg,
};