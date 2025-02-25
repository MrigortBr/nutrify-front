"use client";
import styled from "styled-components";

export const NewPostContainerWithNav = styled.div`
  width: 82vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewPostContainer = styled.div`
  width: 70vw;
  height: 86vh;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const NewPostheader = styled.div`
  height: 10%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  padding: 0 0;
  display: flex;
`;

export const HeaderClose = styled.img`
  height: 100%;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const HeaderTitle = styled.h1`
  height: 100%;
  width: 50%;
  margin-left: 20%;
  text-align: center;
`;

export const NewPostInputContainer = styled.div`
  background-color: ${(props) => props.theme.palette.grey[100]};
  width: 67.5%;
  height: 90%;
  border-bottom-left-radius: 20px;
  display: flex;
  flex-wrap: wrap;
`;
export const NewPostInputImageHelp = styled.img`
  height: 40%;
  margin: auto;
`;
export const NewPostInputTextHelp = styled.p`
  width: 100%;
  height: fit-content;
  text-align: center;
  margin: 0;
  font-family: "Imprima";
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-size: calc(var(--px) * 28);
`;
export const NewPostInputButton = styled.button`
  width: 40%;
  height: fit-content;
  border-radius: 20px;
  height: 10%;
  margin: 0 auto;
  margin-top: -11%;
  font-size: calc(var(--px) * 28);
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
`;

export const NewPostInfoContainer = styled.div`
  gap: 0;
  width: 32.5%;
  height: 90%;
  padding: 2.5% 1%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 16% 30% 5% 10% 15% 15% 12%;
`;

export const NewPostInfoUserSpan = styled.span`
  width: 100%;
  height: 16%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
`;

export const NewPostInfoPictureUser = styled.img`
  width: 23%;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

export const NewPostInfoUsername = styled.p`
  width: 70%;
  height: fit-content;
  margin: auto;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

export const NewPostInfoCaption = styled.textarea`
  width: 100%;
  height: 90%;
  margin-top: auto;
  padding: 3%;
  resize: none;
  background-color: ${(props) => props.theme.palette.grey[200]};
  color: ${(props) => props.theme.palette.primary.contrastText};
  border: 0;
  font-family: "Imprima";
  border-radius: 5px;
  &:focus {
    outline: 0;
  }
`;

export const NewPostInfoInput = styled.input`
  width: 100%;
  height: 60%;
  margin: auto;
  padding: 3%;
  resize: none;
  background-color: ${(props) => props.theme.palette.grey[200]};
  color: ${(props) => props.theme.palette.primary.contrastText};
  border: 0;
  font-family: "Imprima";
  border-radius: 5px;
  &:focus {
    outline: 0;
  }
`;

export const NewPostInfoLimitText = styled.p`
  color: ${(props) => props.theme.palette.primary.contrastText};
  width: 100%;
  text-align: right;
`;

export const NewPostPublish = styled.button`
  width: 60%;
  height: fit-content;
  border-radius: 20px;
  height: 100%;
  margin: 0 auto;
  font-family: "Imprima";
  font-size: calc(var(--px) * 28);
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border: 0;
  cursor: pointer;
  transition: 500ms;

  &:hover {
    transform: scaleX(1.1);
  }
`;

export const DataListContainer = styled.div`
  display: flex;
  height: 85%;
`;

export const DataListLabel = styled.p`
  font-size: calc(var(--px) * 18);
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const DataList = styled.select`
  background-color: ${(props) => props.theme.palette.text.primary};
  color: ${(props) => props.theme.palette.primary.contrastText};
  height: 50%;
  width: 40%;
  border-radius: 5px;
`;

export const NewPostPreview = styled.div`
  background-color: ${(props) => props.theme.palette.grey[100]};
  width: 67.5%;
  height: 90%;
  border-bottom-left-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
  position: relative;
`;

export const DeletePreview = styled.img`
  position: absolute;
  width: 6%;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border-radius: 50%;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  right: 5%;
  top: 5%;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Preview = styled.img`
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

export const ButtonsSpan = styled.span`
  display: flex;
  gap: 5%;
`;

export const NewPostDelete = styled.button`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 20px;
  font-size: calc(var(--px) * 28);
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border: 0;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    transform: scaleX(1.1);
  }

  & > span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > span > svg {
    width: 50%;
    height: 50%;
  }
`;
