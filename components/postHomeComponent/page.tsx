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
import LoadingSpinner from "../LoadingSpinner/page";

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

  const [loadMoreComments, setLoadMoreComments] = useState(false);

  const [page, setPage] = useState(0);

  const [liked, setLiked] = useState<boolean>(prop.post.ilike ?? false);
  const [sendLike, setSendLike] = useState(false);
  const [likes, setLikes] = useState<number>(prop.post.likes);

  const [showAll, setShowAll] = useState(false);

  const [simpleProfile, setSimpleProfile] = useState<simpleProfile>();

  const router = useRouter();

  useEffect(() => {
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

    const newComments = [{ id: "0", comment: newComment, created_at: new Date().toString(), username: simpleProfile?.username || "Eu: " }];

    setComments((o) => newComments.concat(o));
    setShowComments(true);
  }

  async function openComments() {
    if (listPost == undefined || listPost.nextPage) {
      setPage((o) => o + 1);
      setLoadMoreComments(true);
      const haveNewComment = comments.filter((v) => v.id == "0").length > 0;
      const r = await getComments(prop.post.id, haveNewComment ? 0 : page, haveNewComment ? Math.floor((comments.length + 10) / 10) * 10 : 10);

      if (r.data?.comments) {
        setCommentsResponse(r.data.comments);
        if (page == 0 || haveNewComment) {
          setComments(r.data?.comments?.comments);
        } else {
          setComments((o) => o.concat(r.data?.comments?.comments ?? []));
        }
        setShowComments(true);
        setCommentsShow(comments.length);
        setCommentsMax(r.data.comments.commentsNumber);
        setListPost(r.data.comments);
        setLoadMoreComments(false);
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
          <ItemSvg style={{ display: liked ? "none" : "" }} onClick={like} $liked={liked}>
            <MySvg src="icons/heart-no.svg" />
          </ItemSvg>
          <ItemSvg style={{ display: liked ? "" : "none" }} onClick={like} $liked={liked}>
            <MySvg src="icons/heart.svg" />
          </ItemSvg>
          <ItemSvg onClick={openComments} $liked={false}>
            <MySvg src="icons/chat-no.svg" />
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
        <>
          {!loadMoreComments ? (
            <>
              {prop.post.commentsnumber > 0 ? (
                <PostComments onClick={openComments}>Ver todos os {prop.post.commentsnumber} comentários</PostComments>
              ) : (
                <PostComments style={{ opacity: 0 }}> .</PostComments>
              )}
            </>
          ) : (
            <PostComments>Carregando Posts...</PostComments>
          )}
        </>
      ) : (
        <PostCommentsWithComments>
          <h4>
            <b>Comentarios: </b>
          </h4>
          {comments.map((comment, index) => (
            <p key={index}>
              <b onClick={() => router.push(Routes.profile + `?u=${comment.username}`)}>@{comment.username}: </b>
              {comment.comment} <span>{comment.created_at}</span>
            </p>
          ))}
          {comments.length != commentsMax ? (
            <>
              {!loadMoreComments ? (
                <PostComments onClick={openComments}>Ver todos os {commentsMax - comments.length} comentários</PostComments>
              ) : (
                <PostComments>Carregando Posts...</PostComments>
              )}
            </>
          ) : (
            <></>
          )}
        </PostCommentsWithComments>
      )}
      {prop.post.iCanComment ? (
        <PostCommentSpan>
          {prop.post.commentsnumber > 0 ? (
            <PostComment value={newComment} onChange={(e) => setNewComment(e.currentTarget.value)} placeholder="Adicionar comentario"></PostComment>
          ) : (
            <PostComment value={newComment} onChange={(e) => setNewComment(e.currentTarget.value)} placeholder="Seja o primeiro a comentar!"></PostComment>
          )}
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
