import styled from "styled-components";
import { UserUsername } from "../profile/styled";
import { keyframes } from "styled-components";

const dotAnimation = keyframes`

  0%{
    content: "."
  }
  25%{
    content: ".."
  }
  50%{
    content: "..."
  }
  75%{
    content: ".."
  }
  100%{
    content: "."
  }

`;

export const LoadingText = styled(UserUsername)`
  color: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 2%;

  &::after {
    content: "oi";
    margin-left: 5px;
    display: inline-block;
    animation: ${dotAnimation} 2s infinite;
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 82vw;
  margin: auto;
`;
