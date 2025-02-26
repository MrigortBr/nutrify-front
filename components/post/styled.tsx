import styled from "styled-components";

export const PostS = styled.div`
  width: calc(45vw + 25vw);
  height: 90vh;
  margin: auto;
  margin-left: 5vw;
`;

export const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  border: 1px solid black;
  grid-template-columns: 70% 30%;
  grid-template-rows: 15% 45% 10% 10% 20%;
`;
