import styled, { keyframes } from "styled-components";

const OpenAnimation = keyframes`
  0%{
    padding-top: 100vh;
  }
  99%{
    padding-top: 8vh;
    align-items: normal
  }
  100%{
    padding-top: 0;
    align-items: center
  }
`;

const CloseAnimation = keyframes`
  0%{
    padding-top: 0;
  }
`;

export const BackgroundModal = styled.div<{ $reverse: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  top: 0;
  display: flex;
  justify-content: center;
  padding-top: 100vh;
  animation-name: ${({ $reverse }) => ($reverse ? CloseAnimation : OpenAnimation)};
  animation-fill-mode: forwards;
  animation-duration: 1s;
`;
