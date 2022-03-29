import React from 'react';
import styled from 'styled-components';

const ScriptItemLoading = () => {
  return (
    <>
      <LoadingItem></LoadingItem>
    </>
  );
};

const LoadingItem = styled.div`
  width: 1144px;
  height: 225.51px;
  background: #efefef;
  border-radius: 20px;
  margin-bottom: 37px;

  animation: skeleton-gradient 1.8s infinite ease-in-out;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;

export default ScriptItemLoading;
