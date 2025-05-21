import styled from "styled-components";

export const ContainerVerify = styled.main`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(4, 186, 100, 1) 0%, rgba(3, 135, 72, 1) 8%, rgba(2, 84, 45, 1) 69%);
  opacity: 0.96;
  display: flex;
  position: relative;
  font-family: "Karla", serif;
  overflow-x: hidden;
`;

export const DivVerify = styled.div`
  width: 35vw;
  height: 40vh;
  background-color: #ffff;
  border-radius: 20px;
  margin: auto;
  border: 2px solid rgba(88, 199, 21, 0.25);
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  position: absolute;
  left: 35vw;
  top: 30vh;
  user-select: none;

`;

export const GifConfirm = styled.img`
  width: 20%;
  margin: 0 auto;
  height: fit-content;
`;

export const VerifyText = styled.h1`
  color: #02542d;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-top: 10%;
  font-size: calc(var(--px) * 40);
`;
