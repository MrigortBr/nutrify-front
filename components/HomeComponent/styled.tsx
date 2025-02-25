"use client";

import styled, { keyframes } from "styled-components";
import { UserPicture } from "../menu/styled";

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  width: 85vw;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  padding-bottom: 1%;
  width: 50vw;
  margin: 2vh auto;
`;

export const PostPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
`;

export const PostPictureImgSpan = styled.span`
  width: 100%;
  height: 70vh;
  background-color: #80808030;
  margin-top: 3vh;
  align-items: center;
  display: flex;
`;

export const PostPictureImg = styled.img`
  height: 70vh;
  object-fit: cover;
  margin: auto;
`;

export const PostActions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 10vh;
`;

export const PostCaption = styled.span<{ $showAll: boolean }>`
  width: 80%;
  color: ${(props) => props.theme.palette.primary.contrastText};
  position: relative;
  cursor: pointer;

  &::after {
    width: fit-content;
    font-weight: bolder;
    padding: 0 2%;
    background-color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  ${({ $showAll }) =>
    $showAll
      ? `
      word-break: break-all;
      overflow-wrap: break-all;
      white-space: normal;
      height: fit-content;
      width: 100%;

      `
      : `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      `};
`;

export const PostComments = styled.div`
  width: 100%;
  color: ${(props) => props.theme.palette.primary.contrastText};
  word-break: break-all;
  overflow-wrap: break-all;
  white-space: normal;
  cursor: pointer;
`;

export const PostCommentsWithComments = styled(PostComments)`
  margin: 3% 0;

  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  & > p {
    padding-left: 3%;
  }

  & > p > span {
    color: #808080b7;
    margin-left: auto;
    margin-left: 15px;
  }
`;

export const PostFunctionItemHome = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-weight: bolder;
`;

export const ItemSvg = styled.span<{ $liked: boolean }>`
  cursor: pointer;

  & > span {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 5%;
  }

  & > span > svg {
    fill: ${(props) => (!props.$liked ? props.theme.palette.grey[900] : props.theme.palette.primary.light)};
    width: 100%;
    height: 70%;
    aspect-ratio: 1/1;
    cursor: pointer;
    transition: 500ms;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const PostComment = styled.textarea`
  background-color: transparent;
  border: 0;
  color: #01381e;
  width: 99.5%;
  margin: auto;
  height: 5vh;
  resize: none;
  font-size: calc(var(--px) * 26);
  font-family: "Imprima";

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: #01381e;
  }
`;

export const PostCommentSpan = styled.span`
  display: flex;
  width: 100%;
  color: #01381e;
  position: relative;
`;

const openSendButton = keyframes`
  0%{
    top: 35vh;
    opacity: 0;
  }
  100%{
    top: 35%;
  }

`;

const closeSendButton = keyframes`
  100%{
    top: 35vh;
    opacity: 0;
  }
  0%{
    top: 35%;
  }

`;

export const ButtonSendComment = styled.button<{ $show: boolean }>`
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  right: 3.5%;
  border: 0;

  transition: 500ms;
  animation-name: ${({ $show }) => ($show ? openSendButton : closeSendButton)};
  animation-fill-mode: forwards;
  animation-duration: 500ms;

  & > span {
    height: 60%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
    transition: 500ms;
    fill: ${(props) => props.theme.palette.secondary.dark};
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.contrastText};
  }

  &:hover > span > svg {
    fill: ${(props) => props.theme.palette.secondary.light};
  }

  & > span > svg {
    transition: 500ms;
    fill: ${(props) => props.theme.palette.secondary.dark};
  }
`;

export const PostHeader = styled.div`
  display: flex;
  grid-template-columns: 20% 80%;
  height: 75%;
  width: 100%;
  margin-top: auto;
`;

export const PostPictureSpan = styled.span`
  height: 80%;
  margin: auto 1%;
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

export const PostPictureUser = styled(UserPicture)``;

export const PostUsername = styled.p`
  cursor: pointer;
  font-size: calc(var(--px) * 30);
  margin: auto 1%;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;
