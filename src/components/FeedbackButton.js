import React from 'react';
import styled from 'styled-components';
import ReactGA from "react-ga";

const FeedbackButton = (props) => {
  return (
    <FeedbackBtn href='https://docs.google.com/forms/d/e/1FAIpQLSeR3ohxnyR_1sGIVmpMhkkXTt3gy2MFbMdR4ZTzMgNCp17DYw/viewform' target='_blank'
    onClick={() => {
      ReactGA.event({
        category: "Button",
        action: "Feedback",
        label: "Feedback",
      });
    }}>
      <svg
        width='30'
        height='24'
        viewBox='0 0 30 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.34 0V2.07C10.095 1.575 8.76 1.32 7.425 1.32C4.74 1.32 2.055 2.34 0 4.395L4.995 9.39H6.66V11.055C7.95 12.345 9.63 13.02 11.325 13.095V16.5H6.84V21C6.84 22.65 8.19 24 9.84 24H24.84C27.33 24 29.34 21.99 29.34 19.5V0H11.34ZM9.675 9.615V6.39H6.255L4.695 4.83C5.55 4.5 6.48 4.32 7.425 4.32C9.435 4.32 11.31 5.1 12.735 6.51L14.85 8.625L14.55 8.925C13.785 9.69 12.765 10.125 11.67 10.125C10.965 10.125 10.275 9.945 9.675 9.615V9.615ZM26.34 19.5C26.34 20.325 25.665 21 24.84 21C24.015 21 23.34 20.325 23.34 19.5V16.5H14.34V12.615C15.195 12.27 15.99 11.76 16.68 11.07L16.98 10.77L21.225 15H23.34V12.885L14.34 3.93V3H26.34V19.5Z'
          fill='#000'
        />
      </svg>
    </FeedbackBtn>
  );
};

const FeedbackBtn = styled.a`
  position: fixed;
  display: block;
  width: 2.92vw;
  height: 2.92vw;
  right: 4.43vw;
  bottom: 4.22vw;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  border-radius: 2.6vw;
  cursor: pointer;
  transition: 0.3s;

  svg {
    width: 1.56vw;
    height: 1.25vw;
    margin-right: 0.16vw;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default FeedbackButton;
