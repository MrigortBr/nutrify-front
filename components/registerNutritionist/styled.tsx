import styled from "styled-components";
import { SpanInputText } from "../login/styles";

export const SpanInputTextDouble = styled(SpanInputText)`
  width: 80%;
  display: grid;
  grid-template-columns: 70% 30%;
`;

export const DataListRegister = styled.select`
  width: 80%;
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 0 5%;
  position: relative;
  font-size: calc(var(--px) * 16);
  color: black;
  background-color: #fff;
  margin-left: auto;
  font-family: "Imprima", serif;

  &:focus {
    border: 0;
    outline: 0;
  }

  @media (max-width: 768px) {
    font-size: calc((var(--px) * 16) * 4);
  }
`;
