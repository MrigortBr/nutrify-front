import styled from "styled-components";

export const CardContainer = styled.div`
  width: 40vw;
  height: 85vh;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;
export const NutriInfo = styled.div`
  color: black;
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: 40% 15% 25%;
  height: 30%;
  width: 100%;

  & > h1 {
    font-size: calc(var(--px) * 30);
    width: 100%;
    height: fit-content;
    margin-top: auto;
  }

  & > h2 {
    font-size: calc(var(--px) * 28);
  }

  & > span {
    display: flex;
    align-items: center;
    font-size: calc(var(--px) * 28);
    gap: 1vw;
  }
`;

export const NutriInfoImage = styled.img`
  grid-row-start: 1;
  grid-row-end: 4;
  height: 80%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin: auto;
`;

export const HoursContainer = styled.div`
  height: 50%;
  width: 90%;
  margin: auto;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;

  & > span {
    width: fit-content;
    height: calc(var(--px) * 30);
    color: white;
    font-size: calc(var(--px) * 26);
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 1vw;
    padding: 2% 1%;
    box-sizing: content-box;
    margin-top: -1.7vw;
    margin-right: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
    position: absolute;
  }
`;

export const HoursDate = styled.input`
  background-color: transparent;
  border: 0;
  font-size: calc(var(--px) * 26);
  margin-left: 1vw;

  &:focus {
    outline: 0;
  }
`;

export const HoursSpan = styled.div`
  width: 95%;
  height: 75%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const Hour = styled.div<{ $selected?: boolean }>`
  width: fit-content;
  padding: 2%;
  font-size: calc(var(--px) * 24);
  height: fit-content;
  border-radius: 20px;
  cursor: pointer;
  margin: 1vw;
  color: ${(props) => props.theme.palette.secondary.main};
  background-color: ${(props) => (props.$selected ? props.theme.palette.primary.light : props.theme.palette.primary.contrastText)};
  position: relative;
  z-index: 9999;
  transition: 500ms;
`;

export const ButtonSend = styled.button<{ $ican: boolean }>`
  margin: auto;
  width: 30%;
  height: fit-content;
  font-size: calc(var(--px) * 26);
  border-radius: 20px;
  transition: 500ms;
  background-color: ${(props) => (props.$ican ? props.theme.palette.primary.light : props.theme.palette.primary.contrastText)};
  cursor: ${(props) => (props.$ican ? "pointer" : "not-allowed")};
`;
export const TotalValue = styled.span`
  width: 100%;
  height: fit-content;
  font-size: calc(var(--px) * 26);

  color: black;
  text-align: center;
  margin-top: 1vh;
`;

export const CloseButton = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  width: 7vh;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  transition: 250ms;
  right: 1vw;
  top: 1vw;

  &:hover {
    transform: scale(1.1);
  }

  & > span {
    width: 6vh;
    height: 6vh;
  }

  & > span > svg {
    width: 100%;
    height: 100%;
  }
`;
