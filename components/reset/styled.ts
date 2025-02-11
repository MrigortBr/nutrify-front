import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const BlurBackground = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const enterFromLeft = keyframes`

  from { left: 35vw; }
  to { left: 5vw; }
`;
const exitToLeft = keyframes`
  from { left: 5vw; }
  to { left: 35vw;}
`;

const enterFromRight = keyframes`
  from { left: 65vw; }
  to { left: 35vw; }
`;
const exitToRight = keyframes`
  from { left: 35vw; }
  to { left: 65vw; }
`;

const enterFromLeftMobile = keyframes`
  from { left: 10vw; }
  to { left: 5vw; }
`;
const exitToLeftMobile = keyframes`
  from { left: 5vw; }
  to { left: 10vw;}
`;

const enterFromRightMobile = keyframes`
  from { left: 10vw; }
  to { left: 5vw; }
`;
const exitToRightMobile = keyframes`
  from { left: 5vw; }
  to { left: 10vw;}
`;

export const BackgroundModal = styled.div<{ closed: "closed" | "open"; side: "left" | "right" }>`
  width: 30vw;
  height: 60vh;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  top: 20vh;
  display: flex;
  flex-wrap: wrap;
  border-radius: ${(prop) => (prop.side === "left" ? "20px 0 0 20px" : "0 20px 20px 0")};
  background-color: #ffffff;
  animation: ${({ closed, side }) =>
      side === "left" ? (closed === "closed" ? exitToLeft : enterFromLeft) : closed === "closed" ? exitToRight : enterFromRight}
    0.3s forwards;
  @media (max-width: 768px) {
    width: 80vw;
    height: 60vh;
    animation: ${({ closed, side }) =>
        side === "left" ? (closed === "closed" ? exitToLeftMobile : enterFromLeftMobile) : closed === "closed" ? exitToRightMobile : enterFromRightMobile}
      0.3s forwards;
  }

  /* &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/png/crumpled-white-paperboard.jpg");
    opacity: 0.6;
    z-index: -1;
    background-size: ${(prop) => (prop.side === "left" ? "cover" : "contain")};
    border-radius: ${(prop) => (prop.side === "left" ? "20px 0 0 20px" : "0 20px 20px 0")};
  } */
`;

export const BackPageRight = styled.img`
  width: 3vw;
  height: 3vw;
  margin: 4% 0;
  right: 0;
  position: absolute;
  z-index: 4;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 10vw;
    height: 10vw;
  }
`;

const easeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const BackPage = styled.img`
  width: 3vw;
  height: 3vw;
  margin: 4% 2%;
  position: absolute;
  z-index: 3;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 10vw;
    height: 10vw;
  }
`;

export const EmailSended = styled.img`
  width: 80%;
  margin: 0 auto;
  margin-top: -10vh;
  height: fit-content;
  animation: ${easeInAnimation} 0.5s ease-in forwards;
`;

export const TitleReset = styled.h1<{ $animation?: "hidden" }>`
  color: #02542d;
  height: 10%;
  margin-left: auto;
  width: 100%;
  text-align: center;
  margin-top: 5%;
  font-size: calc(var(--px) * 40);
  animation: ${easeInAnimation} 0.5s ease-in forwards;
  animation: ${({ $animation }) => ($animation === "hidden" ? "none" : ``)};
  z-index: 3;

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 40) * 3);
  }
`;

export const ConfirmEmail = styled.p`
  color: #000000;
  font-size: calc(var(--px) * 20);
  transition: 500ms;
  height: fit-content;
  width: 80%;
  margin: 0 auto;
  margin-top: -8vh;
  text-align: center;
  & > b {
    color: #02542d;
  }
  animation: ${easeInAnimation} 0.5s ease-in forwards;

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 3);
  }
`;

export const SendAnother = styled.p`
  color: #000000;
  font-size: calc(var(--px) * 20);
  transition: 500ms;
  height: fit-content;
  width: 80%;
  margin: 0 auto;
  margin-top: -2vh;
  text-align: center;
  & > b {
    cursor: pointer;
    color: #02542d;
  }
  animation: ${easeInAnimation} 0.5s ease-in forwards;

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 3);
  }
`;
