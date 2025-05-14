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
import {
  PostContainer,
  PostsContainer,
  PostPicture,
  PostActions,
  PostComments,
  PostCaption,
  PostComment,
  PostPictureImg,
  PostPictureImgSpan,
  NoContent,
  FeedType,
  FeedTypeLi,
} from "./styled";
import { followAPI, homeAPI, SimplePost, SimplePostNew } from "@/service/requests/Post";
import { simpleProfile } from "@/service/requests/profile";
import { showAlert } from "../alert/page";
import PostHomeComponent from "../postHomeComponent/page";
import LoadingSpinner from "../LoadingSpinner/page";
import ModalNewPost from "../modalNewPost/page";
import { openModal } from "../MyCustomModal/page";
import MySvgNew from "../MySvg/new";

export default function HomeComponent() {
  const [showAll, setShowAll] = useState(false);
  const [load, setLoad] = useState(true);
  const [posts, setPosts] = useState<SimplePostNew[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [type, setType] = useState<"follow" | "discover">("discover");
  const t = <MySvgNew src="icons/heart-no.svg" />;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile(); // Verifica no carregamento
    window.addEventListener("resize", checkMobile); // Atualiza ao redimensionar

    return () => window.removeEventListener("resize", checkMobile);
  });

  async function getDataHome() {
    setLoad(true);

    const r = await homeAPI();

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
    }

    if (r.data?.simplePost) {
      setPosts(r.data.simplePost);
    }

    setLoad(false);
  }

  async function getDataFollow() {
    setLoad(true);

    const r = await followAPI();

    if (r.data?.simplePost) {
      console.log(r.data.simplePost);
      setPosts(r.data.simplePost);
    }

    setLoad(false);
  }

  useEffect(() => {
    getDataHome();
  }, []);

  return (
    <PostsContainer>
      <FeedType $type={type}>
        <FeedTypeLi
          $type={type == "follow"}
          onClick={() => {
            setType("follow");
            getDataFollow();
          }}
        >
          Seguindo
        </FeedTypeLi>
        <FeedTypeLi
          $type={type == "discover"}
          onClick={() => {
            setType("discover");
            getDataHome();
          }}
        >
          Descobrir
        </FeedTypeLi>
      </FeedType>
      {load ? (
        <LoadingSpinner
          text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando comentarios", "Atualizando informações", "Verificando conexões"]}
        />
      ) : (
        <>
          {posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <PostHomeComponent post={post} index={index} key={index} />
              ))}
            </>
          ) : (
            <>
              {type == "discover" ? (
                <NoContent>
                  No momento não existem postagens publicadas! Seja o primeiro a fazer uma postagem,{" "}
                  <b onClick={() => openModal(<ModalNewPost closeCall={(tag: string) => console.log(tag)} />)}>clicando aqui</b>
                </NoContent>
              ) : (
                <NoContent>
                  No momento não existem postagens publicadas por seus seguidos! <b>Siga pessoas novas para poder ver posts!</b>{" "}
                </NoContent>
              )}
            </>
          )}
        </>
      )}
    </PostsContainer>
  );
}
