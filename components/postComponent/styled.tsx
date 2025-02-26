import styled, { keyframes } from "styled-components";
import { UserPicture, UserPictureContainer } from "../menu/styled";
import Image from "next/image";

export const PostHeader = styled.div`
  display: flex;
  grid-template-columns: 20% 80%;
  height: 75%;
  width: 100%;
  margin-top: auto;
`;
export const PostUsername = styled.p`
  font-size: calc(var(--px) * 30);
  margin: auto 1%;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

export const PostPictureSpan = styled.span`
  height: 80%;
  margin: auto 1%;
  aspect-ratio: 1/1;
  display: flex;
  position: relative;

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

export const PostPictureUser = styled(UserPicture)``;

export const PostPictureContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2%;
  border-radius: 20px;
  display: flex;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 6;
  position: relative;
`;

export const PostPicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const showTrue = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

const showFalse = keyframes`
  100%{
    opacity: 1;
  }

  0%{
    opacity: 0;
  }
`;

export const UserMarked = styled.span<{ $show: boolean }>`
  background-color: #1f1f1f;
  position: absolute;
  border-radius: 50%;
  height: 5vh;
  display: flex;
  justify-content: center;
  right: 4%;
  bottom: 4%;
  transition: 500ms;
  cursor: pointer;
  flex-wrap: wrap;

  width: ${({ $show }) => ($show ? "fit-content" : "5vh")};
  height: ${({ $show }) => ($show ? "fit-content" : "5vh")};
  padding: ${({ $show }) => ($show ? "1%" : "0")};
  border-radius: ${({ $show }) => ($show ? "20px" : "50%")};
  flex-direction: ${({ $show }) => ($show ? "column" : "")};
  align-items: ${({ $show }) => ($show ? "flex-start" : "center")};

  animation: ${({ $show }) => ($show ? showTrue : showFalse)};
  animation-fill-mode: forwards;
  animation-duration: 1s;

  & > p {
    transition: 500ms;
    margin-top: 5%;
    margin-bottom: 5%;
    height: 5vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
    cursor: pointer;
  }

  & > p:hover {
    color: ${(props) => props.theme.palette.primary.light};
  }
`;

export const UserEdit = styled(UserMarked)`
  left: 4%;
  bottom: 4%;

  & > p:hover {
    color: white;
  }
`;

export const ImageMarked = styled.img`
  height: 100%;
  border-radius: 100%;
`;

export const PostFunctions = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  & > span {
    height: 10px;
  }
`;

export const PostFunctionItem = styled.div<{ $liked?: boolean }>`
  display: grid;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: 60% 40%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: bolder;

  & > span {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  & > span > svg {
    fill: ${(props) => (!props.$liked ? props.theme.palette.grey[900] : props.theme.palette.primary.light)};
    width: 100%;
    height: 50%;
    aspect-ratio: 1/1;
    cursor: pointer;
    transition: 500ms;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const PostComments = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-top: 5%;
  padding-bottom: 5%;
  height: 90%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-all;
  overflow-wrap: break-all;
  white-space: normal;
  cursor: pointer;
`;

export const PostComment = styled.p`
  color: ${(props) => props.theme.palette.secondary.dark};
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  word-wrap: break-word;
  height: fit-content;
  width: 100%;
  margin-bottom: 10px;

  & > b {
    font-family: "Imprima";
    color: ${(props) => props.theme.palette.primary.contrastText};
    margin-right: 0.5rem;
    height: fit-content;
  }

  & > img {
    height: 5vh;
    max-height: 30px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

export const PostInputComments = styled.input`
  border: 0;
  border-radius: 20px;
  height: 100%;
  margin: auto 0;
  width: 75%;
  margin-left: 5%;
  font-size: calc(var(--px) * 20);
  background-color: transparent;
  padding: 0 2%;
  color: ${(props) => props.theme.palette.secondary.dark};

  &:focus {
    outline: 0;
  }
`;

export const PostInputCommentsSpan = styled.span`
  display: flex;
  position: relative;
  width: 90%;
  height: 50%;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  margin: auto;
  border-radius: 20px;
`;

const openSendButton = keyframes`
  0%{
    top: 35vh;
  }
  100%{
    top: 17.5%;
  }

`;

const closeSendButton = keyframes`
  100%{
    top: 35vh;
  }
  0%{
    top: 17.5%;
  }

`;

export const SendCommentButton = styled.button<{ $show: boolean }>`
  position: absolute;
  height: 60%;
  aspect-ratio: 1/1;
  background-color: white;
  border-radius: 50%;
  right: 5%;
  display: flex;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};

  cursor: pointer;
  transition: 500ms;
  animation-name: ${({ $show }) => ($show ? openSendButton : closeSendButton)};
  animation-fill-mode: forwards;
  animation-duration: 500ms;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.contrastText};
  }

  & > span {
    height: 50%;
    width: 50%;
    margin: auto;
    aspect-ratio: 1/1;
  }

  &:hover > span > svg {
    fill: ${(props) => props.theme.palette.secondary.light};
  }

  & > span > svg {
    height: 100%;
    width: 100%;
    transition: 500ms;
    fill: ${(props) => props.theme.palette.secondary.dark};
  }
`;

export const PostInputCommentsNo = styled.div`
  color: ${(props) => props.theme.palette.secondary.dark};
  & > b {
    font-family: "Imprima";
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
  height: 50%;
  margin: auto;
`;

export const PostCommentNo = styled.p`
  color: ${(props) => props.theme.palette.secondary.dark};
  & > b {
    font-family: "Imprima";
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
  text-align: center;
  margin: auto;
`;
