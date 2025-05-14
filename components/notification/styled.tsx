import styled from "styled-components";

export const ContainerNotification = styled.div`
  width: 30vw;
  height: 86vh;
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 20px;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

export const NotificationHeader = styled.div`
  height: 10%;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  padding: 0 0;
  display: flex;
`;

export const NotificationClose = styled.img`
  height: 100%;
  transition: 300ms;
  margin-right: 5%;

  margin-left: auto;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const NotificationTitle = styled.h1`
  height: 100%;
  width: 50%;
  margin-left: 20%;
  text-align: center;
`;

export const NotificationItemsContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  flex-direction: column;
`;

export const NotificationItem = styled.div<{ $read: boolean }>`
  background-color: ${({ $read }) => ($read ? "#dfdfdf" : "#eeeeee")};
  width: 90%;
  border-radius: 10px;
  box-shadow: 1px 4px 14px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2% auto;
  height: 10%;
  cursor: pointer;
  transition: 500ms;
  position: relative;
`;
export const NotificationItemTitle = styled.p`
  color: ${(props) => props.theme.palette.primary.contrastText};
  display: flex;
`;
