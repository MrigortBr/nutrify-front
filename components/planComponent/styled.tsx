import styled, { css, keyframes } from "styled-components";

export const PlanContainer = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 5%;
`;

export const PlanType = styled.ul<{ $selected: number }>`
  list-style: none;
  color: black;
  font-size: calc(var(--px) * 20);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2%;
  padding: 1% 0;
  position: relative;
  width: 50%;
  margin-left: 25%;

  &::after {
    content: " ";
    background-color: ${(props) => props.theme.palette.primary.light};
    position: absolute;
    width: 50%;
    height: 100%;
    border-radius: 20px;
    transition: 500ms;
    left: ${({ $selected }) => ($selected == 0 ? "0" : "50%")};
    z-index: 1;
    cursor: pointer;
  }
  & > li {
    z-index: 3;
    background-color: transparent;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
`;

export const PlanDateSpan = styled.span`
  display: flex;
  height: 5vh;
  gap: 5px;
`;

export const PlanDateDate = styled.span`
  display: flex;
  gap: 5px;
  background-color: ${(props) => props.theme.palette.primary.light};
  border-radius: 20px;
  padding: 0 1.5%;
  align-items: center;

  & > p {
    width: fit-content;
    height: fit-content;
    color: ${(props) => props.theme.palette.secondary.light};
    font-size: calc(var(--px) * 26);
  }
`;

export const PlanEditOrCreate = styled.div`
  margin-left: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
  gap: 0;
  height: 5vh;
`;

const open = keyframes`
  0%{
    width: 5vh;
  }

  100%{
    width: 15vw;
  }
`;

const close = keyframes`
  0%{
    width: 15vw;
  }

  100%{
    width: 5vh;
  }
`;

export const PlanAddDiv = styled.div`
  background-color: ${(props) => props.theme.palette.primary.light};
  white-space: nowrap;
  overflow: hidden;
  width: 5vh;
  height: 5vh;
  box-sizing: border-box;
  border-radius: 20px;
  border: 0;
  font-size: calc(var(--px) * 26);
  margin: 0 5%;
  padding: 0.5vh 0.5vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 0;
  margin-left: 1vw;
  animation: ${close};
  animation-duration: 500ms;
  transition: 1ms;
  animation-fill-mode: backwards;

  &:hover {
    animation: ${open};
    animation-delay: 100ms;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
  }

  & > span {
    width: 4vh;
    height: 4vh;
    display: flex;
    border-radius: 50%;
    padding: 0.25vh;
  }

  & > span > svg {
    height: 100%;
    aspect-ratio: 1/1;
    stroke: transparent;
    fill: ${(props) => props.theme.palette.secondary.light};
  }

  & > span > svg > path {
    fill: ${(props) => props.theme.palette.secondary.light};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const PlanAddSelect = styled.select`
  font-size: calc(var(--px) * 26);
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.palette.secondary.light};
  width: 11vw;
  & > * {
    color: ${(props) => props.theme.palette.secondary.dark};
  }

  &:focus {
    outline: none;
    cursor: pointer;
  }

  & > optgroup {
    width: 11vw;
  }

  & > option {
    width: 11vw;
  }
`;

export const PlanDate = styled.input`
  font-size: calc(var(--px) * 20);
  background-color: transparent;
  color: ${(props) => props.theme.palette.secondary.light};
  border: 0px solid black;
  border-radius: 20px;
  text-align: center;
  &:focus {
    outline: 0;
  }

  &::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    cursor: pointer;
  }
`;

export const PlanCarrousel = styled.div`
  margin-top: 2vh;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const PlanItemContainer = styled.div`
  display: flex;
  gap: 0px;
  margin-right: 1vw;
`;

export const PlanItem = styled.div<{ $marked: boolean }>`
  min-width: 15vw;
  max-width: 15vw;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  padding: 1%;
  color: ${(props) => props.theme.palette.secondary.dark};
  cursor: pointer;
  position: relative;
  transition: 500ms;
  z-index: 999;
  background-color: ${({ $marked }) => ($marked ? "#05ba625e" : "transparent")};

  &:hover {
    background-color: ${({ $marked }) => (!$marked ? "#05ba625e" : "transparent")};
  }
`;
export const PlanItemImg = styled.img`
  height: 30vh;
  width: 100%;
  border-radius: 20px;
`;
export const PlanItemTitle = styled.h1`
  font-size: calc(var(--px) * 28);
  text-align: center;
`;

export const PlanItemTitleInput = styled.input`
  font-size: calc(var(--px) * 28);
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  color: ${(props) => props.theme.palette.secondary.dark};

  &:focus {
    outline: 0;
  }
`;

export const PlanItemTitleDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

export const PlanItemTitleInputDate = styled.input`
  font-size: calc(var(--px) * 28);
  text-align: center;
  background-color: transparent;
  border: none;
  width: 100%;
  color: ${(props) => props.theme.palette.secondary.dark};

  &:focus {
    outline: 0;
  }
`;

export const PlanItemDescription = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PlanButton = styled.button`
  font-size: calc(var(--px) * 22);
  background-color: #05ba62;
  border: 0;
  border-radius: 20px;
  padding: 1% 1%;
  width: 90%;
  margin: auto;
  transition: 500ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PlanButtonDiv = styled.div`
  display: flex;
  width: 90%;
  gap: 5%;
  flex-wrap: nowrap;
  margin: auto;
  margin-top: 1vh;
`;

const openIn = keyframes`
    0%{
        left: 0%;
        opacity: 0;
        max-width: 1px;
        min-width: 1px;
    }

    100%{
        left: 99%;
        opacity: 1;
        min-width: 15vw;

    }
`;

const exit = keyframes`
    100%{
        left: 0%;
        opacity: 0;
        max-width: 1px;
        min-width: 1px;
    }

    0%{
        left: 99%;
        opacity: 1;
        min-width: 15vw;

    }
`;

export const PlanItemRecipe = styled.span<{ $showRecipe: boolean }>`
  height: 80%;
  margin-top: 10%;
  margin-right: 0;
  padding: 1%;
  background-color: #05ba62;
  overflow-y: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ $showRecipe }) =>
    $showRecipe
      ? css`
          animation: ${openIn} 500ms forwards;
          z-index: 1;
        `
      : css`
          animation: ${exit} 500ms forwards;
          z-index: -3;
        `};
`;

export const PlanItemRecipeTextArea = styled.textarea<{ $showRecipe: boolean }>`
  height: 80%;
  margin-top: 10%;
  margin-right: 0;
  padding: 1%;
  background-color: #05ba62;
  overflow-y: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  resize: none;
  color: ${(props) => props.theme.palette.secondary.dark};

  &:focus {
    outline: 0;
  }

  ${({ $showRecipe }) =>
    $showRecipe
      ? css`
          animation: ${openIn} 500ms forwards;
          z-index: 1;
        `
      : css`
          animation: ${exit} 500ms forwards;
          z-index: -3;
        `};
`;

export const NoPlan = styled.h1`
  margin: auto;
  text-align: center;
  color: ${(props) => props.theme.palette.secondary.dark};
`;
