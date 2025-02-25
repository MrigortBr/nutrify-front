"use client";

import { likeAPI, sendCommentAPI, SimplePostNew } from "@/service/requests/Post";
import {
  PostActions,
  PostCaption,
  PostContainer,
  PostPictureImg,
  PostComment,
  PostComments,
  PostPictureImgSpan,
  PostFunctionItemHome,
  PostHeader,
  PostPictureSpan,
  PostPictureUser,
  PostUsername,
  PostCommentsWithComments,
  PostCommentSpan,
  ButtonSendComment,
  ItemSvg,
} from "../HomeComponent/styled";
import MySvg from "../MySvg/page";
import {} from "../postComponent/styled";
import { JSX, useEffect, useRef, useState } from "react";
import { comment, getComments, ListPost } from "@/service/requests/Comments";
import { showAlert } from "../alert/page";
import { simpleProfile } from "@/service/requests/profile";
import { Routes } from "@/enum/Routes";
import { useRouter } from "next/navigation";

type Props = {
  post: SimplePostNew;
  index: number;
  el?: JSX.Element;
};

export default function PostHomeComponent(prop: Props) {
  const [comments, setComments] = useState<comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentsShow, setCommentsShow] = useState(0);
  const [commentsMax, setCommentsMax] = useState(prop.post.commentsnumber);
  const [commentsResponse, setCommentsResponse] = useState<ListPost>();
  const [newComment, setNewComment] = useState("");
  const [listPost, setListPost] = useState<ListPost>();

  const [liked, setLiked] = useState<boolean>(prop.post.ilike ?? false);
  const [sendLike, setSendLike] = useState(false);
  const [likes, setLikes] = useState<number>(prop.post.likes);

  const [showAll, setShowAll] = useState(false);

  const [simpleProfile, setSimpleProfile] = useState<simpleProfile>();

  const router = useRouter();

  useEffect(() => {
    console.log(prop.post.iCanComment);

    const simpleS = localStorage.getItem("simpleProfile");
    if (simpleS) setSimpleProfile(JSON.parse(simpleS));
  }, []);

  async function like() {
    if (!sendLike) {
      setSendLike(true);
      if (liked) setLikes((likes) => Number(likes) - 1);
      else setLikes((likes) => Number(likes) + 1);
      setLiked((e) => !e);

      const r = await likeAPI(prop.post.id);

      if (!r.success) {
        showAlert(r.data?.message || "", "error");
        setLiked((e) => !e);
        if (liked) setLikes((likes) => Number(likes) - 1);
        else setLikes((likes) => Number(likes) + 1);
      }
      setSendLike(false);
    }
  }

  async function sendComment() {
    if (newComment.length < 3) {
      showAlert("O Tamanho do comentario deve maior ou igual a 4 caracters", "info");
      return;
    }

    const r = await sendCommentAPI(prop.post.id, newComment);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    }

    await openComments();
    setShowComments(true);
  }

  async function openComments() {
    if (listPost == undefined || listPost.nextPage) {
      let page = 0;
      if (listPost?.page) page = Number(listPost.page) + 1;
      const r = await getComments(prop.post.id, page);

      if (r.data?.comments) {
        setCommentsResponse(r.data.comments);
        setComments((o) => o.concat(r.data?.comments?.comments ?? []));
        setShowComments(true);
        setCommentsShow(comments.length);
        setCommentsMax(r.data.comments.commentsNumber);
        setListPost(r.data.comments);
      }
    }
  }

  return (
    <PostContainer key={prop.index}>
      <PostHeader style={{ height: "5vh" }} onClick={() => router.push(Routes.profile + `?u=${prop.post.username}`)}>
        <PostPictureSpan>
          <PostPictureUser src={prop.post.pictureUser || "/png/remo.jpg"} />
        </PostPictureSpan>
        <PostUsername>@{prop.post.username}</PostUsername>
      </PostHeader>
      <PostPictureImgSpan>
        <PostPictureImg src={prop.post.picture || "/png/remo.jpg"}></PostPictureImg>
      </PostPictureImgSpan>
      <PostActions>
        <PostFunctionItemHome style={{ marginRight: "3vw" }}>
          <ItemSvg onClick={like} $liked={liked}>
            <MySvg src="icons/heart.svg" />
          </ItemSvg>
          <ItemSvg onClick={openComments} $liked={false}>
            <MySvg src="icons/chat.svg" />
          </ItemSvg>
        </PostFunctionItemHome>
        <PostFunctionItemHome>
          <p>{likes} Curtidas</p>
        </PostFunctionItemHome>
      </PostActions>
      <PostCaption $showAll={showAll} onClick={() => setShowAll((o) => !o)}>
        <b>@{prop.post.username}:</b> {prop.post.caption}
      </PostCaption>
      {!showComments ? (
        <PostComments onClick={openComments}>Ver todos os {prop.post.commentsnumber} comentários</PostComments>
      ) : (
        <PostCommentsWithComments>
          <h4>
            <b>Comentarios: </b>
          </h4>
          {comments.map((comment, index) => (
            <p key={index}>
              <b onClick={() => router.push(Routes.profile + `?u=${prop.post.username}`)}>@{comment.username}: </b>
              {comment.comment} <span>{comment.created_at}</span>
            </p>
          ))}
          {comments.length != commentsMax ? (
            <PostComments onClick={openComments}>Ver todos os {commentsMax - comments.length} comentários</PostComments>
          ) : (
            <></>
          )}
        </PostCommentsWithComments>
      )}
      {prop.post.iCanComment ? (
        <PostCommentSpan>
          <PostComment value={newComment} onChange={(e) => setNewComment(e.currentTarget.value)} placeholder="Adicionar comentario"></PostComment>
          <ButtonSendComment $show={newComment.length > 3} onClick={sendComment}>
            <MySvg src="icons/send.svg"></MySvg>
          </ButtonSendComment>
        </PostCommentSpan>
      ) : (
        <>
          <PostCommentSpan style={{ justifyContent: "center" }}>
            {" "}
            <b>Comentario bloqueado</b>
          </PostCommentSpan>
        </>
      )}
    </PostContainer>
  );
}
