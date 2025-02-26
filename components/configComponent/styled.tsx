import styled from "styled-components";
import { InputText } from "../login/styles";
import { keyframes } from "styled-components";

export const ConfigContainer = styled.div`
  width: 35vw;
  height: 85vh;
  position: absolute;
  z-index: 999999;
  background-color: ${(props) => props.theme.palette.secondary.main};
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  margin: auto;
`;

export const ConfigHeader = styled.div`
  height: 10%;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
`;

export const ConfigClose = styled.div`
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  cursor: pointer;
  left: 0;
  & > span {
    width: 100%;
    height: 100%;
    display: flex;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
  }
`;

export const ConfigText = styled.h1``;

export const ConfigGroup = styled.ul`
  display: grid;
  list-style: none;
  padding: 2%;
  color: ${(props) => props.theme.palette.secondary.dark};
`;

export const ConfigGroupLabel = styled.p`
  font-size: calc(var(--px) * 28);
  padding-left: 1.5%;
  border-left: 5px solid ${(props) => props.theme.palette.primary.light};
`;

export const ConfigItem = styled.li`
  display: flex;
  padding: 5%;
`;

export const ItemLabel = styled.p``;

export const ItemInput = styled.select`
  background-color: ${(props) => props.theme.palette.text.primary};
  color: ${(props) => props.theme.palette.primary.contrastText};
  height: 100%;
  width: 40%;
  border-radius: 5px;
  margin-left: auto;
`;

export const ItemField = styled(InputText)`
  height: 100%;
  width: 60%;
  margin-left: auto;
`;

const animateButton = keyframes`
  0%{
    top: 100vh;
  }
  100%{
    top: 80vh;
  }

`;

const animateButtonR = keyframes`
  100%{
    top: 100vh;
  }
  0%{
    top: 80vh;
  }

`;

export const ButtonSaveConfig = styled.button<{ $reverse: boolean }>`
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  width: 60%;
  height: 10%;
  height: 10vh;
  border: 0;
  border-radius: 20px;
  font-size: calc(var(--px) * 28);
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  position: absolute;
  left: 20%;
  transition: 200ms;

  top: 100vh;
  animation-name: ${({ $reverse }) => ($reverse ? animateButton : animateButtonR)};
  animation-fill-mode: forwards;
  animation-duration: 500ms;

  &:hover {
    transform: scaleX(1.05);
  }
`;
