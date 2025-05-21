import styled, { css, keyframes } from "styled-components";

export const NutriComponent = styled.div`
  width: 82vw;
`;

export const NutriNav = styled.nav<{ $element: number }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 10vh;
  position: relative;
  width: 60vw;
  margin: auto;

  & > p {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: calc(var(--px) * 24);
    cursor: pointer;
    transition: 500ms;
    z-index: 999;
    width: 15vw;
    user-select: none;
    text-align: center;
  }

  & > .selected {
    transition: 500ms;

    color: white;
    font-weight: bolder;
  }

  &::after {
    content: " ";
    position: absolute;
    z-index: 1;
    width: 16vw;
    height: calc(var(--px) * 24);
    padding: 3% 0%;
    border-radius: 20px;
    left: 2vw;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: 500ms;

    left: ${({ $element }) => {
      switch ($element) {
        case 1:
          return "-.5vw";
        case 2:
          return "14.5vw";
        case 3:
          return "29vw";
        case 4:
          return "44vw";
        default:
          return "0%";
      }
    }};
  }
`;

export const NutriNavTwo = styled(NutriNav)`
  &::after {
    content: " ";
    position: absolute;
    z-index: 1;
    width: 16vw;
    height: calc(var(--px) * 24);
    padding: 3% 0%;
    border-radius: 20px;
    left: 2vw;
    background-color: ${(props) => props.theme.palette.primary.main};
    transition: 500ms;

    left: ${({ $element }) => {
      switch ($element) {
        case 1:
          return "14.5vw";
        case 2:
          return "29vw";
        default:
          return "0%";
      }
    }};
  }
`;

export const Stats = styled.div`
  height: 70vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5vw;
`;

export const StatsInfo = styled.div`
  width: 25vw;
  padding: 1vw;
  background-color: ${(props) => props.theme.palette.primary.main};
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  height: 15vh;
`;

export const StatsNumber = styled.p`
  font-size: calc(var(--px) * 36);
  font-weight: bolder;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;

  & > span {
    height: calc(var(--px) * 54);
  }

  & > span > svg {
    height: calc(var(--px) * 36);
    width: 100%;
  }
`;

export const StatusDesc = styled.p`
  font-size: calc(var(--px) * 26);
  text-align: center;
`;

export const Service = styled.div`
  height: 85vh;
  display: flex;
  flex-wrap: nowrap;
  width: 90%;
  margin: auto;
  margin-top: 1vh;
  border: 1px solid black;
  border-radius: 20px;
`;

export const ServiceDate = styled.div`
  width: 100%;
  height: 10%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    display: flex;
    width: fit-content;
    border-radius: 20px;
    background-color: ${(props) => props.theme.palette.primary.main};
    border: 1px solid black;
    padding: 0 2%;
  }

  & > div > p {
    font-size: calc(var(--px) * 26);
    color: white;
  }
`;

export const ServiceDateTwo = styled(ServiceDate)`
  width: fit-content;
  margin-left: auto;
  margin-right: 1vw;
`;

export const ServiceDateInput = styled.input`
  background-color: transparent;
  border: 0;
  color: white;
  font-size: calc(var(--px) * 26);
  margin-left: 1vw;
`;
export const User = styled.div`
  width: 100%;
  height: 16vh;
  border: none;
  padding: 1%;
  display: grid;
  column-gap: 5%;
  grid-template-columns: 30% 65%;
  grid-template-rows: 50% 50%;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

export const UsersService = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 90%;

  overflow-x: hidden;
  overflow-y: auto;
`;

export const UserImg = styled.img`
  height: 80%;
  margin: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export const UserTitle = styled.h1`
  width: 100%;
  font-size: calc(var(--px) * 28);
`;

export const UserHour = styled.div``;

export const UserDescription = styled.span`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const UserButtonsDiv = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  height: 100%;
  align-items: end;
  justify-content: center;
`;

export const UserButton = styled.button`
  background-color: ${(props) => props.theme.palette.primary.main};
  border: 0;
  width: 40%;
  height: 60%;
  margin: 0 5%;
  border-radius: 20px;
  cursor: pointer;
  transition: 500ms;

  &:hover {
    transform: scaleX(1.1);
  }
`;

export const ConfigContainer = styled.div`
  width: 90%;
  height: 80vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

export const ConfigHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 1vw;
  align-items: center;
  justify-content: center;
  margin-top: 2.5vh;
`;

export const ConfigMarker = styled.div`
  font-size: calc(var(--px) * 26);
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  color: black;
  padding: 0.5%;
  border-radius: 20px;
  position: relative;
  gap: 5px;

  & > input {
    color: black;
    text-align: center;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid black;
    width: fit-content;
  }

  & > input:focus {
    outline: 0;
  }
`;

export const ConfigMarkeritem = styled.p<{ $selected: boolean }>`
  width: 20%;
  height: 20%;
  text-align: center;
  height: fit-content;
  position: relative;
  color: ${({ $selected }) => ($selected ? "white" : "black")};
  cursor: pointer;
  &::after {
    position: absolute;
    content: ${({ $selected }) => ($selected ? "''" : "''")};
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    width: 100%;
    height: 100%;
    left: 0;
    border-radius: 20px;
    position: absolute;
    z-index: -1;
    transition: 500ms;
    background-color: ${(props) => props.theme.palette.primary.light};
  }
`;

export const ConfigHours = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid black;
  border-radius: 20px;
  display: grid;
  padding: 5px;
  grid-template-rows: 90% 10%;
  gap: 5px;
  grid-template-columns: repeat(24, 1fr);
  position: relative;

  & > label {
    grid-row-start: 2;
    color: black;
    font-size: calc(var(--px) * 18);
    position: relative;
  }

  & > label::after {
    content: " ";
    width: 1%;
    height: 920%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: calc(99% / 2);
    top: -920%;
    z-index: -1;
  }
`;

export const ConfigHour = styled.div<{ $init: number; $final: number; $status: "open" | "closed" }>`
  grid-column-start: ${({ $init }) => $init + 1};
  grid-column-end: ${({ $final }) => $final + 2};
  margin-top: ${({ $init, $final }) => `${($init + $final) * 3.5}%`};
  grid-row-start: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100%;
  white-space: "nowrap";
  height: 5vh;
  border-radius: 20px;
  transition: 500ms;
  background-color: ${(props) => (props.$status == "open" ? props.theme.palette.primary.light : "red")};
  cursor: pointer;
  &:hover {
    z-index: 9999999999;
    border: 1px solid black;
  }
  user-select: none;
`;

export const ConfigDate = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

export const ConfigDatePicker = styled.div`
  margin-top: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 0 2%;
  background-color: ${(props) => props.theme.palette.primary.light};
  font-size: calc(var(--px) * 26);
  cursor: pointer;
  & > input {
    background: transparent;
    border: 0;
    font-size: calc(var(--px) * 25);
    margin-left: 0.5vw;
  }
`;

export const ConfigDatePickerToModal = styled(ConfigDatePicker)`
  margin-left: auto;
  transition: 500ms;

  &:hover {
    transform: scaleX(1.1);
  }
`;

export const DeleteItem = styled.span`
  width: 8vh;
  height: 8vh;
  background-color: red;
  position: absolute;
  bottom: -5vh;
  border-radius: 20px;
  right: -4vw;
  display: flex;
  align-content: center;
  justify-content: center;
  box-shadow: 1px 4px 14px 0px rgba(255, 0, 0, 0.75);

  & > span {
    width: 60%;
    height: 60%;
    margin-top: 20%;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
  }
`;

export const PlanContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 90vh;
  overflow-y: auto;
`;

export const RevenuesConatiner = styled.div`
  color: ${(props) => props.theme.palette.primary.contrastText};
  width: 95%;
  margin: auto;
  margin-top: 3%;
  font-size: calc(var(--px) * 26);
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  border-bottom: 1px solid black;
`;

export const RevenuesHeader = styled.div`
  height: 10%;
  display: flex;
  width: 100%;
  padding: 0 1%;

  & > button {
    width: 20%;
    height: fit-content;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
    border: 0;
    padding: 1%;
    border-radius: 15px;
    font-size: calc(var(--px) * 22);
    cursor: pointer;
    transition: 500ms;
    margin: auto 0 auto auto;
  }

  & > button:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
  }

  & > select {
    width: 20%;
    height: fit-content;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
    border: 0;
    padding: 1%;
    border-radius: 15px;
    font-size: calc(var(--px) * 22);
    cursor: pointer;
    transition: 500ms;
    margin: auto 0 auto auto;
  }
`;

export const RevenueContent = styled.div`
  width: 100%;
  height: 65vh;
  overflow: auto;
  display: flex;
  padding: 1vh;
  box-sizing: content-box;
  overflow-y: hidden;
`;

export const Revenue = styled.div<{ $showRecipe: boolean }>`
  background-color: white;
  color: ${(props) => props.theme.palette.primary.contrastText};
  width: 15vw;
  border-radius: 20px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  padding: 1%;
  border: 1px solid black;
  height: 95%;
  margin-right: ${({ $showRecipe }) => ($showRecipe ? "18vw" : "2vw")};
  transition: 500ms;
`;

export const SimpleRevenueContainer = styled.div<{ $selected: boolean }>`
  width: fit-content;
  padding: 1%;
  border-radius: 20px;
  background-color: transparent;
  border: 1px solid black;
  color: ${(props) => props.theme.palette.primary.contrastText};
  transition: 500ms;
  background-color: ${(props) => (!props.$selected ? "transparent" : "#05ba625e")};
  cursor: pointer;
`;

export const RevenueBody = styled.div`
  height: 100%;
  width: 15vw;

  & > h1 {
    margin-top: 2vh;
    font-size: calc(var(--px) * 24);
    width: 100%;
    text-align: center;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;

    & > input {
      border: 0;
      color: ${(props) => props.theme.palette.primary.contrastText};
      background-color: transparent;
      font-size: calc(var(--px) * 24);
      border-bottom: 1px solid black;
      text-align: center;
      width: 100%;
    }

    & > input:focus {
      outline: 0;
    }
  }

  & > h2 {
    font-size: calc(var(--px) * 24);
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    & > input {
      border: 0;
      color: ${(props) => props.theme.palette.primary.contrastText};
      background-color: transparent;
      font-size: calc(var(--px) * 24);
      border-bottom: 1px solid black;
      margin-left: 5px;
      width: 100%;
    }

    & > input:focus {
      outline: 0;
    }
  }
  & > h3 {
    font-size: calc(var(--px) * 24);
    width: 100%;

    & > input {
      border: 0;
      color: ${(props) => props.theme.palette.primary.contrastText};
      background-color: transparent;
      font-size: calc(var(--px) * 24);
      width: 30%;
      border-bottom: 1px solid black;
    }

    & > input::-webkit-calendar-picker-indicator {
      display: none;
      background-color: red;
    }

    & > input:focus {
      outline: 0;
    }
  }
  & > h4 {
    font-size: calc(var(--px) * 24);
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 2vh;

    & > input {
      width: 100%;
      border: 0;
      color: ${(props) => props.theme.palette.primary.contrastText};
      background-color: transparent;
      font-size: calc(var(--px) * 24);
      border-bottom: 1px solid black;
      margin-left: 5px;
    }

    & > input:focus {
      outline: 0;
    }
  }
`;

export const RevenueImageSpan = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  cursor: pointer;
  & > p {
    font-size: calc(var(--px) * 22);
  }
`;

export const RevenueImg = styled.img`
  height: 20vh;
  max-width: 100%;
  border-radius: 20px;
  margin: auto;
`;

export const ShowRevenue = styled.div<{ $hover?: boolean; $negative?: boolean }>`
  width: 90%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  margin: auto;
  transition: 500ms;
  color: white;
  margin-top: 1vh;

  background-color: ${(props) => (props.$negative ? "red" : !props.$hover ? props.theme.palette.primary.contrastText : props.theme.palette.primary.light)};

  &:hover {
    transform: scalex(1.1);
    background-color: ${(props) => props.theme.palette.primary.light};
  }
`;

export const EditDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;

  & > .delete {
    background-color: rgb(125, 0, 0);
  }

  & > .delete:hover {
    background-color: rgb(255, 0, 0);
  }
`;

const openIn = keyframes`
    0%{
        overflow-y: hidden;
        left: 0%;
        max-width: 1px;
        min-width: 1px;
        z-index: -3;
    }

    99.9%{
      z-index: -3;
    }

    100%{
        left: 99%;
        z-index: 9999;
        min-width: 15vw;

    }
`;

const exit = keyframes`
    100%{
        left: 0%;
        opacity: 0;
        max-width: 1px;
        min-width: 1px;
        z-index: -3;

    }

    0%{
        left: 99%;
        opacity: 1;
        min-width: 15vw;
        z-index: -3;


    }
`;

export const RevenueInfo = styled.span<{ $showRecipe: boolean }>`
  height: 80%;
  margin-top: 10%;
  margin-left: 1%;
  padding: 1%;
  width: 90%;
  background-color: #05ba62;
  color: white;
  overflow-y: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  font-size: calc(var(--px) * 22);

  ${({ $showRecipe }) =>
    $showRecipe
      ? css`
          animation: ${openIn} 500ms forwards;
        `
      : css`
          animation: ${exit} 500ms forwards;
        `};
`;

export const RevenueInfoTextArea = styled.textarea<{ $showRecipe: boolean }>`
  height: 80%;
  margin-top: 10%;
  margin-left: 1%;
  padding: 1%;
  width: 90%;
  background-color: #05ba62;
  color: white;
  overflow-y: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  font-size: calc(var(--px) * 22);
  border: 1px solid transparent;

  transition: 500ms;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: 0;
    border: 1px solid black;
  }

  ${({ $showRecipe }) =>
    $showRecipe
      ? css`
          animation: ${openIn} 500ms forwards;
        `
      : css`
          animation: ${exit} 500ms forwards;
        `};
`;

export const RevenueList = styled.div``;

export const RevenuesListHeader = styled.div``;

export const LeftService = styled.div`
  width: 30%;
  height: 100%;
  margin-left: 0;
  border-right: 1px solid black;
  margin-right: 0;
`;

export const CenterService = styled.div<{ $grid: "yes" | "no" | "wait" }>`
  width: 70%;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: ${({ $grid }) => ($grid == "wait" ? "flex" : "grid")};
  grid-template-columns: 90% 10%;
  grid-template-rows: 100%;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > span {
    display: flex;
    height: 30%;
    align-items: center;
    justify-content: center;
  }

  & > span > svg {
    height: 100%;
    width: fit-content;
    aspect-ratio: 1/1;
    fill: ${(props) => props.theme.palette.primary.light};
  }

  & > h1 {
    font-size: calc(var(--px) * 26);
    text-align: center;
    width: 80%;
    font-weight: bolder;
    color: ${(props) => props.theme.palette.primary.main};
  }

  & > h2 {
    font-size: calc(var(--px) * 20);
    text-align: center;
    width: 80%;
    font-weight: lighter;
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const ImageAddInput = styled.input`
  position: absolute;
  display: none;
  opacity: 0;
`;

export const RigthBar = styled.div`
  height: 100%;
  width: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > span {
    width: 100%;
    transition: 500ms;
    object-fit: 1/1;
    cursor: pointer;
  }

  & > span:hover {
    margin-right: -1vw;
  }

  & > span > svg {
    fill: ${(props) => props.theme.palette.primary.contrastText};
    width: 100%;
    height: 100%;
  }
`;

export const LeftBar = styled.div`
  height: 100%;
  width: 5vw;
  background-color: red;
`;

export const ContainerRevenues = styled.div`
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 1%;

  & > h1 {
    cursor: pointer;
    width: fit-content;
    height: 15%;
    color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

export const MyRevenues = styled.div`
  height: 75%;
  width: 100%;
  overflow-x: auto;
  color: ${(props) => props.theme.palette.primary.contrastText};
  padding: 1%;
  gap: 1%;
  display: flex;
`;

export const RevenuesButtons = styled.div`
  height: 10%;

  width: 100%;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RevenuesButtonsButton = styled.button<{ $ican: boolean }>`
  height: fit-content;
  font-size: calc(var(--px) * 24);
  padding: 0.5% 2%;
  border-radius: 20px;
  border: 0;

  cursor: pointer;
  transition: 500ms;

  cursor: ${(props) => (props.$ican ? "pointer" : "not-allowed")};
  background-color: ${(props) => (props.$ican ? props.theme.palette.primary.light : props.theme.palette.primary.contrastText)};

  &:hover {
    transform: scaleX(1.1);
  }
`;
