"use client";
import PostComponent from "../postComponent/page";
import { PostContainer, PostS } from "./styled";

export default function Post() {
  return (
    <PostS>
      <PostContainer>
        <PostComponent></PostComponent>
      </PostContainer>
    </PostS>
  );
}
