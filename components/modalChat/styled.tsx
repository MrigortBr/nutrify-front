import styled, { keyframes } from "styled-components";

export const ChatContainer = styled.div`
  width: 70vw;
  height: 86vh;
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 20px;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const ChatHeader = styled.div`
  height: 10%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  padding: 0 0;
  display: flex;
`;

export const ChatClose = styled.img`
  height: 100%;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ChatTitle = styled.h1`
  height: 100%;
  width: 50%;
  margin-left: 20%;
  text-align: center;
`;

export const ChatLeft = styled.div`
  height: 90%;
  width: 30%;
  border-bottom-left-radius: 20px;
  border-right: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 100%;
  }

  &::-webkit-scrollbar-thumb {
    background: #68c578bc;
    border-radius: 10px;
    width: 5px;
  }

  &::-webkit-scrollbar-button {
    background-color: transparent;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #68c578;
  }
`;

export const Chat = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

export const ChatImgContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatImgBackground = styled.span`
  height: 60%;
  aspect-ratio: 1/1;
  display: flex;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    transform: scale(1.1);
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(45deg, rgba(1, 56, 30, 1) 0%, rgba(2, 105, 56, 1) 50%, rgba(3, 158, 85, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#01381e",endColorstr="#039e55",GradientType=1);
    z-index: 2;
  }
`;

export const ChatImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  z-index: 3;
`;

const opacityAnimation = keyframes`
  0%{
    opacity: 0
  }

  100%{
    opacity: 1
  }
`;

export const ChatName = styled.p`
  color: ${(props) => props.theme.palette.primary.contrastText};
  width: 60%;
  height: fit-content;
  font-size: calc(var(--px) * 22);
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > span {
    background-color: ${(props) => props.theme.palette.primary.light};
    aspect-ratio: 1/1;
    height: calc(var(--px) * 30);
    font-size: calc(var(--px) * 26);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${opacityAnimation};
    animation-duration: 1s;
    animation-fill-mode: forwards;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 5%;
    margin: auto 5% auto auto;
  }
`;

export const LastMessage = styled.span`
  width: 60%;
  display: flex;

  & > .message {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: calc(var(--px) * 20);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > .hour {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: calc(var(--px) * 16);
    margin-top: auto;
    margin-left: 5px;
    margin-right: 5%;
  }
`;

export const TypeChat = styled.div<{ $type: "nutri" | "friends" }>`
  display: flex;
  padding: 3% 1%;
  position: relative;
  border-bottom: 1px solid black;

  & > p {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: calc(var(--px) * 22);
    width: 50%;
    text-align: center;
    padding: 2% 0%;
    padding-bottom: 4%;
    border-radius: 40px;
    cursor: pointer;
    z-index: 3;
  }

  &::after {
    content: "";
    height: 3px;
    background-color: ${(props) => props.theme.palette.primary.light};
    width: 40%;
    position: absolute;
    bottom: 10%;
    transition: 500ms;
    z-index: 2;
    height: 85%;
    border-radius: 50px;
    left: ${({ $type }) => ($type == "friends" ? "5%" : "55%")};
  }
`;

export const ChatMessages = styled.div`
  height: 90%;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

export const ChatMessagesHeader = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const ChatMessagesClose = styled.img`
  margin: auto;
  margin-left: auto;
  margin-right: 2%;
  height: 60%;
  transition: 300ms;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ChatMessagesFinish = styled.div`
  margin: auto;
  margin-right: 2%;
  height: 60%;
  transition: 300ms;
  background-color: red;
  border-radius: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 2%;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ChatMessagesName = styled.span`
  font-size: calc(var(--px) * 26);
  margin-left: 2%;
  color: ${(props) => props.theme.palette.primary.contrastText};

  & > .status {
    font-size: calc(var(--px) * 20);
    color: gray;
  }
`;

export const ChatMessagesImg = styled(ChatImgBackground)`
  margin-left: 1%;
`;

export const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  gap: 5%;
  justify-content: flex-start;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 3vh;
  scroll-behavior: smooth;

  /* Webkit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 100%;
  }

  &::-webkit-scrollbar-thumb {
    background: #68c578bc;
    border-radius: 10px;
    width: 5px;
  }

  &::-webkit-scrollbar-button {
    background-color: transparent;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #68c578;
  }
`;

export const DateDiv = styled.div`
  background-color: #048304;
  width: fit-content;
  margin: 1vh auto;
  padding: 1% 2%;
  border-radius: 20px;
  font-weight: bolder;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

export const MessageRecived = styled.div`
  display: inline-flex;
  flex-direction: column;
  background-color: #024e02;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-right: auto;
  margin-left: 1%;

  & > .message {
    width: 100%;
    font-size: calc(var(--px) * 26);
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    hyphens: auto;
  }

  & > .hour {
    margin-left: auto;
    font-size: calc(var(--px) * 20);
    margin-right: 5%;
  }
`;

export const MessageSended = styled.span`
  display: inline-flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.primary.light};

  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-left: auto;
  margin-right: 1%;

  & > .message {
    width: 100%;
    font-size: calc(var(--px) * 26);
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    hyphens: auto;
  }

  & > .hour {
    margin-left: auto;
    font-size: calc(var(--px) * 20);
    margin-right: 5%;
  }
`;

export const ChatInputs = styled.div`
  height: 15%;
  width: 100%;
  display: flex;

  & > button {
    height: 50%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    margin: auto;
    cursor: pointer;
    transition: 500ms;
  }

  & > button:hover {
    background-color: ${(props) => props.theme.palette.primary.contrastText};
  }

  & > button > span {
    margin: auto;
    height: 50%;
    aspect-ratio: 1/1;
  }

  & > button > span > svg {
    width: 100%;
    height: 100%;
  }
`;

export const TextareaContainer = styled.textarea`
  resize: none;
  width: 90%;
  padding: 1% 1%;
  margin: auto;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 20px;
  color: ${(props) => props.theme.palette.primary.contrastText};
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 10px; /* Largura da barra de rolagem */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Fundo da barra de rolagem */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.primary.contrastText}; /* Cor da barra de rolagem */
    border-radius: 10px; /* Arredonda as bordas da barra de rolagem */
    border: 3px solid transparent; /* Espaçamento entre a barra e a borda */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.palette.primary.main}; /* Cor ao passar o mouse sobre a barra */
  }

  & > textarea:focus {
    outline: 0;
  }
`;

const dotAnimation = keyframes`
  0%{
    margin-bottom: 0%;
  }

  50%{
    margin-bottom: 10%;
  }

  100%{
    margin-bottom: 0%;
  }

`;

const enter = keyframes`
  0%{
    width: 0;
    
  }

  100%{
    width: 15%;
  }

`;

export const ChatDigit = styled.div`
  display: flex;
  position: absolute;
  left: 2%;
  height: 20%;
  padding: 0 2%;
  align-items: end;
  font-size: calc(var(--px) * 20);
  background-color: #024e02;
  height: calc(var(--px) * 27);
  border-radius: 20px;
  animation: ${enter};
  bottom: 11%;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  & > .dot {
    transition: 2s;
    height: fit-content;
    display: flex;
    justify-content: end;
    margin-bottom: 0%;
  }

  & > .dot1 {
    animation: ${dotAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    margin-left: 5%;
  }

  & > .dot2 {
    animation: ${dotAnimation};
    animation-duration: 2s;
    animation-delay: 0.3s;
    animation-iteration-count: infinite;
  }

  & > .dot3 {
    animation: ${dotAnimation};
    animation-duration: 2s;
    animation-delay: 0.4s;
    animation-iteration-count: infinite;
  }
`;

export const NoChatSelected = styled.div`
  color: ${(props) => props.theme.palette.primary.contrastText};
  text-align: center;
  font-weight: lighter;
  margin: auto;

  & > span {
    display: flex;
    height: 15vh;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  & > span > svg {
    height: 15vh;
    width: 15vh;
    fill: ${(props) => props.theme.palette.primary.light};
  }

  & > h1 {
    font-size: calc(var(--px) * 24);
    font-weight: bold;
  }

  & > h2 {
    font-size: calc(var(--px) * 18);
    color: ${(props) => props.theme.palette.secondary.dark};
    font-weight: lighter;
  }
`;

export const NoChatToMessage = styled.h1`
  color: ${(props) => props.theme.palette.secondary.dark};
  text-align: center;
  font-size: calc(var(--px) * 18);
  font-weight: lighter;
  margin-top: 50%;
`;

export const FinishedContainer = styled.div`
  width: 80%;
  height: 60%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  color: black;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  position: absolute;
  z-index: 5;
  left: 10%;
  top: 20%;

  &::after {
    width: 125%;
    height: 167%;
    background-color: rgba(0, 0, 0, 0.4);
    content: "";
    top: -33.1%;
    left: -12.5%;
    position: absolute;
    z-index: 0; /* Tente valores diferentes para ver o efeito */
  }

  & > span > div {
    height: 5vh;
    width: 100%;
    display: flex;
    position: absolute;
  }

  & > span > div > span {
    margin-left: auto;
  }

  & > span > div > span > svg {
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    fill: black;
    cursor: pointer;
    transition: 500ms;
  }

  & > span > div > span > svg:hover {
    transform: scale(1.1);
  }

  & > span > h1 {
    text-align: center;
    margin: auto;
    z-index: 5;
  }

  & > span > p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: calc(var(--px) * 24);
    z-index: 5;
  }

  & > span > textarea {
    width: 80%;
    height: 40%;
    margin: auto;
    margin-left: 10%;
    font-size: calc(var(--px) * 22);
    background-color: transparent;
    border: 1px solid black;
    border-radius: 20px;
    padding: 1%;
    resize: none;
    color: black;
    margin-top: 2%;
    z-index: 5;
  }

  & > span > button {
    width: fit-content;
    font-size: calc(var(--px) * 24);

    margin: auto;
    background-color: ${(props) => props.theme.palette.primary.light};
    border-radius: 20px;
    padding: 2% 10%;
    border: 0;
    margin-top: 2%;
    z-index: 5;
    transition: 500ms;
    cursor: pointer;
  }

  & > span > button:hover {
    transform: scaleX(1.1);
  }

  & > span {
    width: 100%;
    height: 100%;
    background-color: white;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    color: black;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    position: relative;
    z-index: 5;
  }
`;

export const ChatFinished = styled.p`
  width: 100%;
  text-align: center;
  font-weight: bolder;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;
