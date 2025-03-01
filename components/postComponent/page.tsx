import { useEffect, useState } from "react";
import { UserPicture, UserPictureContainer } from "../menu/styled";
import MySvg from "../MySvg/page";
import {
  PostComment,
  PostCommentNo,
  PostComments,
  PostFunctionItem,
  PostFunctions,
  PostHeader,
  PostInputComments,
  PostInputCommentsNo,
  PostInputCommentsSpan,
  PostPicture,
  PostPictureContainer,
  PostPictureSpan,
  PostPictureUser,
  PostUsername,
  SendCommentButton,
  UserMarked,
  ImageMarked,
  UserEdit,
} from "./styled";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { comments, getSimplePost, likeAPI, mark, sendCommentAPI } from "@/service/requests/Post";
import { showAlert } from "../alert/page";
import { Routes } from "@/enum/Routes";
import LoadingSpinner from "../LoadingSpinner/page";
import { simpleProfile } from "@/service/requests/profile";
import Image from "next/image";
import { openModal } from "../MyCustomModal/page";
import ModalEditPost from "../modalEditPost/page";
import { PostCaption } from "../HomeComponent/styled";

export default function PostComponent() {
  const [liked, setLiked] = useState(false);
  const [sendLike, setSendLike] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [idPost, setIdPost] = useState("");
  const [load, setLoad] = useState<boolean>(true);
  const [image, setImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [comments, setComments] = useState<comments[]>([]);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [icanComment, setIcanComment] = useState(false);
  const [simpleProfile, setSimpleProfile] = useState<simpleProfile>();
  const [comment, setComment] = useState("");
  const [marked, setMarked] = useState<mark[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const [showMarked, setShowMarked] = useState(false);

  const param = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const r = await getSimplePost(param.get("id") ?? "");
      if (!r.success) {
        showAlert(r.data?.message || "", "error");
        router.push(Routes.home);
      }

      if (r.data?.simplePost) {
        const simplePost = r.data.simplePost;
        setImage(simplePost.picture);
        setUserImage(simplePost.pictureUser);
        setUsername(simplePost.username);
        setLikes(simplePost.likes);
        setComments(simplePost.comments);
        setLiked(simplePost.iLike);
        setCommentsNumber(simplePost.commentsNumber);
        setIcanComment(simplePost.iCanComment);
        setMarked(simplePost.userMark);
        setCaption(simplePost.caption);
        console.log(simplePost.caption);
      }

      setLoad(false);
    };

    const simpleS = localStorage.getItem("simpleProfile");
    if (simpleS) setSimpleProfile(JSON.parse(simpleS));
    setIdPost(param.get("id") ?? "");
    getData();
  }, []);

  async function like() {
    if (!sendLike) {
      setSendLike(true);
      if (liked) setLikes((likes) => Number(likes) - 1);
      else setLikes((likes) => Number(likes) + 1);
      setLiked((e) => !e);

      const r = await likeAPI(idPost);

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
    if (comment.length < 3) {
      showAlert("O Tamanho do comentario deve maior ou igual a 4 caracters", "info");
      return;
    }

    const r = await sendCommentAPI(idPost, comment);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    }

    if (simpleProfile) {
      const commentObj: comments = {
        comment: comment,
        pictureUser: simpleProfile.picture,
        username: simpleProfile.username,
      };

      setComments((e) => [commentObj, ...e]);
      setComment("");
    }
  }

  useEffect(() => {
    setCommentsNumber(comments.length);
  }, [comments]);

  return (
    <>
      {!load ? (
        <>
          <PostPictureContainer>
            <PostPicture src={image} />
            {marked.length > 0 ? (
              <UserMarked $show={showMarked} onMouseEnter={() => setShowMarked(true)} onMouseLeave={() => setShowMarked(false)}>
                {showMarked ? (
                  <>
                    {marked.map((v, i) => (
                      <>
                        <p key={i} onClick={() => router.push(Routes.profile + `?u=${v.username}`)}>
                          {v.username}
                          <ImageMarked src={v.picture} alt={v.username} key={i} />
                        </p>
                      </>
                    ))}
                  </>
                ) : (
                  <MySvg src="icons/user.svg"></MySvg>
                )}
              </UserMarked>
            ) : (
              <></>
            )}
            {username == simpleProfile?.username ? (
              <UserEdit
                $show={showEdit}
                onMouseEnter={() => setShowEdit(true)}
                onMouseLeave={() => setShowEdit(false)}
                onClick={() => openModal(<ModalEditPost post={{ id: Number(param.get("id")) || 0, comments: 0, likes: 5, picture: image }} />)}
              >
                {showEdit ? (
                  <p>
                    <MySvg src="icons/edit.svg"></MySvg>
                    Editar
                  </p>
                ) : (
                  <MySvg src="icons/edit.svg"></MySvg>
                )}
              </UserEdit>
            ) : (
              <></>
            )}
          </PostPictureContainer>
          <PostHeader>
            <PostPictureSpan>
              <PostPictureUser src={userImage || "/png/remo.jpg"} />
            </PostPictureSpan>
            <PostUsername>{username}</PostUsername>
          </PostHeader>
          <PostComments>
            {comments.map((v, index) => (
              <PostComment key={index} onClick={() => router.push(Routes.profile + `?u=${v.username}`)}>
                <img src={v.pictureUser || "/png/remo.jpg"} alt="" />
                <b>{v.username}</b> {v.comment}
              </PostComment>
            ))}

            {commentsNumber == 0 ? (
              <>
                {" "}
                <PostCommentNo>
                  Sem comentarios
                  <br />
                  <b>seja o primeiro a comentar</b>
                </PostCommentNo>
              </>
            ) : (
              <></>
            )}
          </PostComments>
          <PostCaption $showAll={showFullCaption} onClick={() => setShowFullCaption((o) => !o)}>
            <b>@{username}:</b> {caption}
          </PostCaption>
          <PostFunctions>
            <PostFunctionItem $liked={liked} onClick={like}>
              <MySvg src="icons/heart.svg" />
              <p>{likes}</p>
            </PostFunctionItem>
            <PostFunctionItem>
              <MySvg src="icons/chat.svg" />
              <p>{commentsNumber}</p>
            </PostFunctionItem>
          </PostFunctions>
          {icanComment ? (
            <PostInputCommentsSpan>
              <PostInputComments value={comment} onChange={(e) => setComment(e.currentTarget.value)} placeholder="Adicione um comentario"></PostInputComments>
              <SendCommentButton $show={comment.length > 3} onClick={sendComment}>
                <MySvg src="icons/send.svg"></MySvg>
              </SendCommentButton>
            </PostInputCommentsSpan>
          ) : (
            <PostInputCommentsNo>
              <b>Você não pode comentar nesse post</b>
            </PostInputCommentsNo>
          )}
        </>
      ) : (
        <span style={{ display: "flex", width: "100%", height: "100%", gridRowStart: "1", gridRowEnd: 6, gridColumnStart: 1, gridColumnEnd: 3 }}>
          <LoadingSpinner
            style={{ margin: "auto" }}
            text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando perfil", "Atualizando informações", "Verificando conexões"]}
          />
        </span>
      )}
    </>
  );
}
