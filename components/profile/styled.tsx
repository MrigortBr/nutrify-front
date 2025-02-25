"use client";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 82vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  margin-bottom: 5vh;

  /* Webkit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    width: 100%;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #68c578bc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-button {
    background-color: transparent;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #68c57871;
  }
`;

export const ProfileInfoContainer = styled.div`
  width: 55.63%;
  height: 25.8vh;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-column-gap: 3%;
  grid-template-rows: 20% 20% 20% 20% 20%;
  color: ${(props) => props.theme.palette.secondary.dark};
  padding: 1%;
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.light};
`;

export const UserPictureContainer = styled.span`
  height: 70%;
  aspect-ratio: 1/1;
  display: flex;
  position: relative;
  grid-row-start: 1;
  grid-row-end: 6;
  margin: auto;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    transform: scale(1.1);
    /* width: calc(100% + 8px);
    height: calc(100% + 8px);
    left: -4px;
    top: -4px; */
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(45deg, rgba(1, 56, 30, 1) 0%, rgba(2, 105, 56, 1) 50%, rgba(3, 158, 85, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#01381e",endColorstr="#039e55",GradientType=1);
    z-index: 2;
  }
`;

export const UserPicture = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  z-index: 3;
`;

export const FirstLine = styled.span`
  display: flex;
  align-items: center;
  height: fit-content;
`;

export const UserUsername = styled.h1`
  font-size: calc(var(--px) * 30);
  font-family: "Imprima";
  margin-right: 5%;
  margin-left: 0;
`;

export const UserUsernameInput = styled.input`
  font-size: calc(var(--px) * 30);
  font-family: "Imprima";
  margin-right: 5%;
  margin-left: 0;
  color: ${(props) => props.theme.palette.primary.contrastText};
  background-color: ${(props) => props.theme.palette.grey[200]};
  border: 0;
  border-radius: 5px;

  &:focus {
    outline: 0;
  }
`;

export const UserButton = styled.button`
  background-color: ${(props) => props.theme.palette.primary.light};
  width: 20vw;
  height: fit-content;
  border-radius: 20px;
  border: 0;
  font-size: calc(var(--px) * 20);
  margin: 0 5%;
  padding: 1% 5%;
  cursor: pointer;
`;

export const UserStats = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const UserStatsItem = styled.li`
  margin: 0 2%;
  &:first-child {
    margin-left: 0;
  }
  font-size: calc(var(--px) * 20);
`;

export const UserName = styled.h2`
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: calc(var(--px) * 22);
  margin: auto 0;
`;

export const UserNameInput = styled.input`
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: calc(var(--px) * 22);
  margin: auto 0;
  color: ${(props) => props.theme.palette.primary.contrastText};

  background-color: ${(props) => props.theme.palette.grey[200]};
  border: 0;
  border-radius: 5px;

  &:focus {
    outline: 0;
  }
`;

export const UserBio = styled.span`
  display: flex;
  align-items: center;
  font-size: calc(var(--px) * 18);
`;

export const UserBioTextArea = styled.textarea`
  display: flex;
  align-items: center;
  font-size: calc(var(--px) * 18);
  resize: none;
  color: ${(props) => props.theme.palette.primary.contrastText};
  background-color: ${(props) => props.theme.palette.grey[200]};
  border: 0;
  border-radius: 5px;

  &:focus {
    outline: 0;
  }
`;

export const UserRec = styled.p`
  font-size: calc(var(--px) * 16);
  display: flex;
  align-items: center;

  & > b {
    cursor: pointer;
    color: ${(props) => props.theme.palette.primary.light};
  }
`;

export const ProfileShowContainer = styled.div`
  width: 48.9544vw;
  height: 74.4vh;
`;

export const ProfileTypeContainer = styled.nav<{ $marker: number }>`
  display: flex;
  height: 4%;
  flex-wrap: nowrap;
  width: 60%;
  margin: 0 auto;
  margin-top: 2vh;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  box-sizing: content-box;
  position: relative;

  &::after {
    content: "";
    width: 30%;
    height: 2px;
    position: absolute;
    background-color: ${(props) => props.theme.palette.primary.main};
    bottom: 0;
    transition: 500ms;

    left: ${({ $marker }) => {
      switch ($marker) {
        case 1:
          return "-1%";
        case 2:
          return "33%";
        case 3:
          return "70%";
        default:
          return "0%";
      }
    }};
  }
`;

export const ProfileTypeItemIconAndText = styled.span`
  width: fit-content;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.palette.primary.main};
  font-family: "Imprima";
  margin: 0 3%;
  cursor: pointer;

  padding: 0 10px;
  padding-bottom: 2px;
  box-sizing: content-box;
  & > span {
    margin-right: 2%;
    height: 100%;
    aspect-ratio: 1/1;
    padding: 1%;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.theme.palette.primary.main};
  }
`;

export const ProfilePictures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15.625vw);
  grid-column-gap: 1.0397vw;
  grid-row-gap: 1.0397vw;
  grid-template-rows: 15.625vw;
  margin-top: 4%;
  width: 100%;
  box-sizing: content-box;
  padding-bottom: 10vh;
`;

export const ProfilePictureSpan = styled.span`
  display: flex;
  position: relative;
`;

export const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5%;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PictureInfoSpan = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5%;
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  transition: 500ms;
  opacity: 0;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const PictureInfoSpanContent = styled.span`
  display: grid;
  grid-template-rows: 50% 50%;
  width: 50%;
  height: 100%;
  align-items: start;
  font-weight: 500;
  margin-left: 5%;
  margin-right: 5%;

  & > span {
    margin-top: auto;
    height: 30%;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
  }

  & > p {
    font-size: calc(var(--px) * 28);
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;

export const UploadContainer = styled.span`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  opacity: 0;
  transition: 500ms;

  &:hover {
    opacity: 1;
  }

  & > span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > span > svg {
    fill: white;
    width: 50%;
    height: 50%;
    aspect-ratio: 1/1;
  }
`;
