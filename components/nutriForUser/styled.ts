import styled from "styled-components";

export const NutriUserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const NutriPage = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 5vh;
`;

export const BestNutri = styled.div`
  width: 80%;
  height: 30vh;
  border: 1px solid black;
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  align-items: center;
  gap: 2.5%;
  justify-content: center;

  &::after {
    content: "Melhores Nutricionistas";
    color: ${(props) => props.theme.palette.secondary.dark};
    background-color: white;
    position: absolute;
    top: calc(((var(--px) * 28) * -0.7));
    left: 2%;
    font-size: calc(var(--px) * 28);
    font-weight: bolder;
  }
`;

const BestNutriCard = styled.div`
  background-color: rgb(227, 241, 229);
  display: grid;
  height: 20vh;
  border-radius: 20px;
  grid-template-rows: 40% 20% 30%;
  color: ${(props) => props.theme.palette.secondary.dark};
  cursor: pointer;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);

  position: relative;

  &:before {
    position: absolute;
    content: "";
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    right: -2vh;
    top: -2vh;
  }

  &:after {
    position: absolute;
    content: "1";
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    width: 4vh;
    right: -1.5vh;
    top: -1.5vh;
    border-radius: 50%;
    color: white;
  }
`;

export const BestNutriPicture = styled.img`
  height: 80%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin: auto;
`;

export const BestNutriStars = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap; */

  display: grid;
  grid-template-rows: 60% 40%;
  align-items: center;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > p {
    width: 100%;
    text-align: center;
    margin: auto;
  }
`;

export const BestNutriName = styled.p`
  font-size: calc(var(--px) * 26);
  text-align: center;
`;

export const OneNutri = styled(BestNutriCard)`
  margin-top: 1vh;

  &::before {
    background-color: #efbf04;
    box-shadow: 1px 4px 14px 0px rgba(221, 217, 3, 0.75);
  }

  &:after {
    background-color: transparent;
    border: 2px solid rgb(182, 147, 6);
  }
`;

export const TwoNutri = styled(BestNutriCard)`
  margin-top: 3vh;
  &::before {
    background-color: #c4c4c4;
    box-shadow: 1px 4px 14px 0px #c4c4c4;
  }

  &:after {
    content: "2";
    background-color: transparent;
    border: 2px solid #3d3d3d;
  }
`;

export const ThreeNutri = styled(BestNutriCard)`
  margin-top: 4vh;
  &::before {
    background-color: #b87333;
    box-shadow: 1px 4px 14px 0px #b87333;
  }

  &:after {
    content: "3";
    background-color: transparent;
    border: 2px solid rgb(105, 66, 30);
  }
`;

export const ExploreNutri = styled.div`
  width: 80%;

  min-height: 10vh;
  height: fit-content;
  max-height: 20vh;
  display: grid;
  grid-template-columns: 75% 20%;
  align-items: center;
  padding: 0% 1%;
  border-radius: 20px;
  border: 1px solid black;
  gap: 5%;
  margin-top: 2vh;

  & > input {
    width: 100%;
    height: 9vh;
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme.palette.secondary.dark};
  }

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    width: 100%;
    height: 60%;
  }

  input:focus {
    outline: 0;
    border: 0;
  }
`;

export const ExploreTitle = styled.span`
  width: 80%;
  color: ${(props) => props.theme.palette.primary.contrastText};
  position: relative;
  height: fit-content;
  margin-top: 2vh;

  margin-left: 10px;
  font-size: calc(var(--px) * 32);

  padding: 0 10px;

  &::before {
    position: absolute;
    background-color: red;
    content: " ";
    width: 4px;
    left: 0;
    height: 100%;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
  }
`;

export const ResultsExplore = styled.div`
  width: 80%;
  min-height: 30vh;
  margin-top: 1vh;
  margin-bottom: 5vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

export const NutriExplore = styled.div`
  display: flex;
  height: 7vh;
  background-color: rgb(227, 241, 229);
  border-radius: 20px;
  border: 1px solid black;
  padding: 0 2%;
  cursor: pointer;
  transition: 500ms;

  &:hover {
    background-color: rgb(175, 231, 184);
  }
`;

export const NutriExplorePicture = styled.img`
  height: 6vh;
  margin-top: 0.5vh;
  border-radius: 50%;
  aspect-ratio: 1/1;
`;
export const NutriExploreName = styled.div`
  color: ${(props) => props.theme.palette.primary.contrastText};
  margin: auto 0;
  margin-left: 1%;
  font-weight: bolder;
`;
export const NutriInfo = styled.div`
  width: 65%;
  margin-left: auto;
  align-items: center;
  justify-content: end;
  color: ${(props) => props.theme.palette.primary.dark};
  display: flex;
  padding: 0 1vh;
  gap: 10px;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const NutriMore = styled.button`
  background-color: rgb(98, 219, 116);
  color: ${(props) => props.theme.palette.primary.dark};
  padding: 8px;
  border: none;
  height: fit-content;
  margin: auto 0;
  border-radius: 10px;
  cursor: pointer;

  transition: 500ms;

  &:hover {
    transform: scaleX(1.1);
  }
`;

export const ExploreFilter = styled.div`
  width: 100%;
  height: 5vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${(props) => props.theme.palette.primary.dark};
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 1%;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-bottom: 2vh;
`;

export const ExploreFilterField = styled.div`
  display: flex;
  gap: 5px;

  align-items: center;

  & > input {
    width: 20%;
    height: 80%;
    background-color: transparent;
    border: 0;
    text-align: center;
    border-bottom: 1px solid black;
    color: ${(props) => props.theme.palette.primary.dark};
  }

  & > input:focus {
    outline: 0;
  }
`;

export const ExploreFilterFieldTwo = styled.div`
  height: 100%;
  display: flex;

  align-items: center;

  & > span {
    align-items: center;
    display: flex;
  }

  & > p {
  }
`;

export const ServiceConatiner = styled.div`
  width: 90%;
  height: 85vh;
  margin: auto;
`;

export const ServiceTitle = styled.h1`
  color: ${(props) => props.theme.palette.primary.dark};
`;

export const ServiceTable = styled.div`
  height: 35vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1vh;
`;

export const ServiceTableItem = styled.div`
  width: 95%;
  margin: 0 auto;
  border: 1px solid black;
  height: 10vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemImg = styled.img`
  height: 95%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-left: 0.5vw;
`;

export const ItemName = styled.p`
  color: ${(props) => props.theme.palette.primary.dark};
  margin-left: 1%;
  font-size: calc(var(--px) * 22);
`;

export const ItemNameStar = styled(ItemName)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  font-weight: bold;
  margin: auto;
`;

export const ItemHour = styled.p`
  color: ${(props) => props.theme.palette.primary.dark};
  margin-left: 17%;
  font-weight: bolder;
  font-size: calc(var(--px) * 22);
`;

export const ItemButton = styled.button`
  padding: 0.5% 2%;
  border-radius: 20px;
  border: 0;
  font-size: calc(var(--px) * 26);
  background-color: ${(props) => props.theme.palette.primary.light};
  margin-left: auto;
  margin-right: 1vw;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    transform: scaleX(1.1);
  }
`;
