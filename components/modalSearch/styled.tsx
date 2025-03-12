import styled from "styled-components";

export const SearchBackground = styled.div`
  width: 55vw;
  min-height: 10vh;
  border-radius: 20px;
  display: flex;
  background-color: ${(props) => props.theme.palette.secondary.light};
  padding: 1%;
  margin-bottom: auto;
  margin-top: 3%;
  flex-wrap: wrap;
`;

export const SearchHeader = styled.div`
  display: flex;
  width: 100%;
  min-height: 10vh;
  max-height: 10vh;
  gap: 2%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0 1%;
  background-color: transparent;
  color: ${(props) => props.theme.palette.secondary.dark};
  border-radius: 20px;
  min-height: 10vh;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: calc(var(--px) * 26);

  &:focus {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export const SearchClose = styled.img`
  height: 80%;
  aspect-ratio: 1/1;
  margin: auto;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  border-radius: 50%;
  cursor: pointer;

  transition: 300ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ContentFinded = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5vh;
`;

export const ProfilesFinded = styled.div`
  color: ${(props) => props.theme.palette.primary.contrastText};
  display: flex;
  flex-direction: column;
  height: 30vh;
  width: 100%;
  & > h1 {
  }
`;

export const Profile = styled.div`
  display: flex;
  grid-template-rows: 5vh 5vh;
  grid-template-columns: 10vh 50%;
  width: 95%;
  height: 10vh;
  position: relative;
  margin: 1% 0;
  margin-left: auto;

  cursor: pointer;
  transition: 500ms;
  border: 1px solid transparent;
  border-radius: 20px;

  &:hover {
    border: 1px solid black;
  }
`;

export const ProfilePictureSpan = styled.span`
  height: 80%;
  margin: auto 1%;
  aspect-ratio: 1/1;
  display: flex;
  position: relative;
  grid-row-start: 1;
  grid-row-end: 3;

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

export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  z-index: 3;
`;

export const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  & > h1 {
    font-size: calc(var(--px) * 26);
    width: 100%;
  }

  & > h2 {
    font-size: calc(var(--px) * 20);
    width: 100%;
  }
`;
