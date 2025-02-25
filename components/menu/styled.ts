import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 18vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.background.default};
  border-right: 2px solid ${(props) => props.theme.palette.primary.main};
`;

export const LogoMenu = styled.span`
  display: grid;
  width: 80%;
  grid-template-columns: 30% 65%;
  column-gap: 5%;
  align-items: center;
  margin: auto;
`;
export const ImageMenu = styled.img`
  width: 100%;
  height: 100%;
`;
export const TextLogoMenu = styled.h1`
  color: ${(props) => props.theme.palette.primary.main};
  height: fit-content;
  text-align: center;
  font-family: "Imprima";
  font-size: calc(var(--px) * 40);
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 15% 15%;
  width: 50%;
  height: 20%;
  margin: auto;
  cursor: pointer;
`;

export const UserPictureContainer = styled.span`
  width: 60%;
  margin: auto;
  aspect-ratio: 1/1;
  display: flex;
  position: relative;

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

export const UserName = styled.p`
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-size: calc(var(--px) * 24);
  text-align: center;
  font-family: "Imprima";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserSign = styled.p`
  text-align: center;
  font-size: calc(var(--px) * 20);
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: "Imprima";
`;

export const MenuComponent = styled.div<{ $select: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 4vh;
  width: 80%;
  margin: 4vh auto;
  cursor: pointer;
  transition: 500ms;
  margin-left: 15%;

  & > * {
    font-weight: ${({ $select }) => ($select ? "bolder" : "lighter")};
  }

  &:hover {
    margin-left: 10%;
    font-weight: bolder;
  }

  color: ${(props) => props.theme.palette.text.secondary};

  ${({ $select }) =>
    $select
      ? `
      margin-left: 10%;
        `
      : ``}
`;

export const ComponentIcon = styled.img`
  height: 100%;
`;

export const ComponentText = styled.h3`
  margin-left: 3%;
  height: fit-content;
  text-align: center;
  font-size: calc(var(--px) * 20);
  color: ${(props) => props.theme.palette.primary.contrastText};
  font-family: "Imprima";
  display: flex;
  align-items: center;
`;
