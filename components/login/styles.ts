import styled from "styled-components";

export const ConatinerLogin = styled.main`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(4, 186, 100, 1) 0%, rgba(3, 135, 72, 1) 8%, rgba(2, 84, 45, 1) 69%);
  opacity: 0.96;
  display: flex;
  position: relative;
  font-family: "Karla", serif;
  user-select: none;
  overflow-x: hidden;
`;

export const Logo = styled.img`
  width: 5.2vw;
  position: absolute;
  top: 0.5vw;
  left: 0.5vw;

  @media (max-width: 768px) {
    height: 12.2vw;
    width: 12.2vw;
    top: 3vw;
    left: 3vw;
  }
`;

export const DivLogin = styled.div<{ go?: "left" | "right" | "center" }>`
  width: 30vw;
  height: 80vh;
  background-color: #ffff;
  border-radius: 20px;
  margin: auto;
  border: 2px solid rgba(88, 199, 21, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  position: absolute;
  left: 35vw;
  top: 10vh;

  @media (max-width: 768px) {
    width: 80vw;
    height: 80vh;
    left: 10vw;

    transition: 300ms;
    ${({ go }) => go === "left" && "left: -70vw;"};
    ${({ go }) => go === "right" && "left: 85vw;"};
  }
`;

export const TextLogin = styled.h1`
  color: #02542d;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  margin-top: 10%;
  font-size: calc(var(--px) * 40);

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 40) * 3);
  }
`;

export const SpanInputText = styled.div`
  width: 80%;
  height: 7.7%;
  margin: 0 auto;
  display: flex;
  position: relative;
`;

export const IconPassword = styled.img`
  position: absolute;
  right: 2%;
  top: 15%;
  width: 10%;
  height: 70%;
  border-radius: 50%;
  cursor: pointer;
  transition: 500ms;
`;

export const InputText = styled.input`
  width: 100%;
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 0 5%;
  position: relative;
  font-size: calc(var(--px) * 16);
  color: black;
  background-color: #fff;
  font-family: "Imprima", serif;

  &:focus {
    border: 0;
    outline: 0;
  }

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 16) * 4);
  }
`;

export const ForgotPassword = styled.p`
  color: #5f5f5f;
  font-size: calc(var(--px) * 20);
  cursor: pointer;
  transition: 500ms;
  height: fit-content;
  width: 80%;
  margin: 0 auto;
  &:hover {
    color: #000000;
  }

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 3);
  }
`;

export const LoginButton = styled.button<{ sending: "sending" | "free" }>`
  background-color: #05ba64;
  font-size: calc(var(--px) * 24);
  border-radius: 20px;
  width: 36.8%;
  height: 8.3%;
  margin: auto;
  border: 0;
  cursor: pointer;
  transition: 300ms;
  font-family: "Imprima", serif;
  color: #000000;

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 24) * 4);
  }

  ${({ sending }) =>
    sending === "sending"
      ? `
      transition: 500ms;
      min-width: 21%;
      cursor: progress;
      backdrop-filter: blur(500px); /* Aplica blur no fundo */
      -webkit-backdrop-filter: blur(500px); /* Para suporte no Safari */
      width: 21%;
      margin: auto;
      background-color: #01713c;
      `
      : `
        &:hover{
          transform: scaleX(1.05);
        }
      `}

  &[sending="sending"] {
  }
`;

export const CreateAccount = styled.p`
  color: #000000;
  font-size: calc(var(--px) * 20);
  cursor: pointer;
  transition: 500ms;
  height: fit-content;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  & > b {
    color: #05ba64;
  }

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 3);
  }
`;

export const LineWidget = styled.span<{ side: string }>`
  width: 35%;
  height: 2px;
  background-color: black;

  &[side="left"] {
    margin-left: 10%;
    margin-right: 0;
  }

  &[side="right"] {
    margin-left: 10%;
  }
`;

export const BackgroundLine = styled.div`
  width: 80%;
  height: calc(var(--px) * 20);
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const WidgetLine = styled.span`
  width: 100%;
  height: 2px;
  background-color: black;
  position: absolute;
  z-index: 1;
`;

export const LineText = styled.p`
  color: black;
  background-color: white;
  border-radius: 50%;
  font-size: calc(var(--px) * 24);
  z-index: 2;
  padding: 5%;
  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 4);
  }
`;

export const LoginWithGoogle = styled.button`
  height: 10%;
  width: 80%;
  border-radius: 20px;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.5);
  background-color: transparent;
  margin: auto;
  display: flex;
  color: #000000;
  font-size: calc(var(--px) * 20);
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: calc((var(--px) * 20) * 4);
  }
`;

export const LogoGoogle = styled.img`
  height: 60%;
  margin-right: 5%;
`;
