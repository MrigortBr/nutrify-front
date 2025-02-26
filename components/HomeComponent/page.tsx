"use client";

import { use, useEffect, useRef, useState } from "react";
import MySvg from "../MySvg/page";
import {
  PostFunctionItem,
  PostHeader,
  PostInputComments,
  PostInputCommentsSpan,
  PostPictureSpan,
  PostPictureUser,
  PostUsername,
  SendCommentButton,
} from "../postComponent/styled";
import { PostContainer, PostsContainer, PostPicture, PostActions, PostComments, PostCaption, PostComment, PostPictureImg, PostPictureImgSpan } from "./styled";
import { homeAPI, SimplePost, SimplePostNew } from "@/service/requests/Post";
import { simpleProfile } from "@/service/requests/profile";
import { showAlert } from "../alert/page";
import PostHomeComponent from "../postHomeComponent/page";
import LoadingSpinner from "../LoadingSpinner/page";

export default function HomeComponent() {
  const [showAll, setShowAll] = useState(false);
  const [load, setLoad] = useState(true);
  const [posts, setPosts] = useState<SimplePostNew[]>([]);

  useEffect(() => {
    const getData = async () => {
      const r = await homeAPI();

      if (!r.success) {
        showAlert(r.data?.message || "", "error");
      }

      if (r.data?.simplePost) {
        setPosts(r.data.simplePost);
      }

      setLoad(false);
    };

    getData();
  }, []);

  return (
    <PostsContainer>
      {load ? (
        <LoadingSpinner
          text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando comentarios", "Atualizando informações", "Verificando conexões"]}
        />
      ) : (
        <>
          {posts.map((post, index) => (
            <PostHomeComponent post={post} index={index} key={index} />
          ))}
        </>
      )}
    </PostsContainer>
  );
}
