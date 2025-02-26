"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ButtonsSpan,
  DataList,
  DataListContainer,
  DataListLabel,
  DeletePreview,
  HeaderClose,
  HeaderTitle,
  NewPostContainer,
  NewPostDelete,
  NewPostheader,
  NewPostInfoCaption,
  NewPostInfoContainer,
  NewPostInfoInput,
  NewPostInfoLimitText,
  NewPostInfoPictureUser,
  NewPostInfoUsername,
  NewPostInfoUserSpan,
  NewPostInputButton,
  NewPostInputContainer,
  NewPostInputImageHelp,
  NewPostInputTextHelp,
  NewPostPreview,
  NewPostPublish,
  Preview,
} from "./styled";
import { showAlert } from "../alert/page";
import { publishAPI, PublishData } from "@/service/requests/publish";
import { openModal } from "../MyCustomModal/page";
import { picture, simpleProfile } from "@/service/requests/profile";
import { getMyPostForEditAPI, Post, PostStatus, removeMyPost, updatePost, VisibilityStatus } from "@/service/requests/Post";
import MySvg from "../MySvg/page";
import LoadingSpinner from "../LoadingSpinner/page";

const optionsVisibility = [
  { value: "*", label: "Público" },
  { value: "onlyFallowers", label: "Somente Seguidores" },
  { value: "onlyIFallow", label: "Somente Quem Eu Sigo" },
  { value: "fallowersAndIFallow", label: "Seguidores e Quem Eu Sigo" },
  { value: "draft", label: "Rascunho" },
  { value: "archived", label: "Arquivado" },
];

export const optionsComments = [
  { value: "*", label: "Público" },
  { value: "onlyFallowers", label: "Somente Seguidores" },
  { value: "onlyIFallow", label: "Somente Quem Eu Sigo" },
  { value: "fallowersAndIFallow", label: "Seguidores e Quem Eu Sigo" },
];

export const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

type Props = {
  closeCall?: (tag: string) => void;
  post?: picture;
};

export default function ComponentPost(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [optionVisibility, setOptionVisibility] = useState<string>("*");
  const [optionComment, setOptionComment] = useState<string>("*");
  const [isDrag, setIsDrag] = useState<"onEnter" | "loadFile" | "none">("none");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [markUser, setMarkUser] = useState<string>("");
  const [post, setPost] = useState<Post>();
  const [simpleProfile, setSimpleProfile] = useState<simpleProfile>();
  const [load, setLoad] = useState(true);
  const [loadContent, setLoadContent] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag("loadFile");
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (validateFile(droppedFiles[0])) {
      setFile(droppedFiles[0]);
      setPreview(URL.createObjectURL(droppedFiles[0]));
    }
  };

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      showAlert("Apenas arquivos JPEG, JPG, PNG ou GIF são permitidos.", "warning");
      setIsDrag("none");
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDrag("loadFile");
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
    setIsDrag("none");
    event.target.value = "";
  };

  const renderDragMessage = () => {
    switch (isDrag) {
      case "onEnter":
        return "Solte o aquivo para envia-lo!";
      case "loadFile":
        return "Carregando arquivo...";
      default:
        return (
          <>
            Arraste e solte a foto <br /> ou
          </>
        );
    }
  };

  const captionSet = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    if (value.length < 2001) {
      setCaption(value);
    }
  };

  const defineMarker = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    let toadd = "";
    if (typeof event == "object") toadd = event.currentTarget.value;
    else toadd = event;
    const lastLetter = toadd[toadd.length - 1];

    if (lastLetter == " " && toadd.length > markUser.length) {
      const split = markUser.split(" ");
      let newResponse = "";
      split.forEach((value) => {
        if (value[0] == "@") {
          newResponse += `${value} `;
        } else {
          newResponse += `@${value} `;
        }
      });

      setMarkUser(newResponse);
    } else {
      setMarkUser(toadd);
    }
  };

  async function convertAndValidateImage(): Promise<string | undefined> {
    if (file == undefined) {
      showAlert("Voce Precisa escolher uma foto!", "warning");
      return;
    }
    const newFile: File = file as File;
    const fileString: string | ArrayBuffer | null = "";
    const error = false;

    if (!allowedTypes.includes(newFile.type)) {
      showAlert("Formato inválido. Apenas JPEG, JPG, PNG e GIF são permitidos.", "warning");
      return;
    }

    try {
      const fileString = await new Promise<string | undefined>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject("Imagem inválida. Tente utilizar outra!");

        reader.readAsDataURL(newFile);
      });

      return fileString;
    } catch (error) {
      showAlert(error as string, "warning");
      return;
    }
  }

  const validateMarker = () => {
    let myArray = markUser.replaceAll("@", "").split(" ");

    myArray = myArray.filter((value) => value.length > 1);

    return myArray;
  };

  function createTags(text: string): string[] {
    return text.match(/#\w+/g) || [];
  }

  const publish = async () => {
    const base64 = await convertAndValidateImage();
    if (base64 == undefined) return;

    const data: PublishData = {
      image: base64 as string,
      caption: caption,
      canComment: optionComment,
      canSee: optionVisibility,
      markers: validateMarker(),
    };

    setLoadContent(true);
    const result = await publishAPI(data);

    if (!result.success) {
      showAlert(result.data?.message || "", "error");
      return;
    }

    showAlert(result.data?.message || "", "success");

    close();
    setLoadContent(false);
  };

  function close() {
    if (props.closeCall) {
      props.closeCall(".plus.");
    }

    openModal(<></>);
  }

  async function update() {
    if (props.post) {
      setLoad(false);
      const r = await updatePost(
        {
          caption: caption,
          post_commentable: optionComment as PostStatus,
          visibility: optionVisibility as VisibilityStatus,
          userMark: validateMarker(),
          tags: createTags(caption),
        },
        props.post.id.toString()
      );

      showAlert(r.data?.message || "", r.success ? "success" : "error");
      setLoad(true);
    }
  }

  async function remove() {
    if (props.post) {
      setLoad(true);
      const r = await removeMyPost(props.post.id.toString());

      showAlert(r.data?.message || "", !r.success ? "success" : "error");
      setLoad(false);

      if (r.success) {
        close();
      }
    }
  }

  useEffect(() => {
    const getData = async () => {
      if (props.post) {
        const r = await getMyPostForEditAPI(props.post.id);

        if (!r.success) {
          showAlert(r.data?.message || "", "error");
        }

        if (r.data?.post) {
          const post: Post = r.data.post;
          setPost(post);
          setCaption(post.caption);
          setOptionVisibility(post.visibility);
          defineMarker(post.userMark.join(" "));
          setOptionComment(post.post_commentable);
        }

        setLoad(true);
      }
    };

    if (props.post != undefined) {
      getData();
    }

    const simpleS = localStorage.getItem("simpleProfile");
    if (simpleS) setSimpleProfile(JSON.parse(simpleS));
    setLoad(false);
  }, []);

  return (
    <>
      {props.post == undefined ? (
        <NewPostContainer>
          <NewPostheader>
            <HeaderClose src="/icons/close.svg" onClick={close} />
            <HeaderTitle>Nova Publicação</HeaderTitle>
          </NewPostheader>
          <NewPostInputContainer
            style={{ display: preview != null ? "none" : "flex" }}
            onDragEnter={() => setIsDrag("onEnter")}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <NewPostInputImageHelp src="/icons/image.svg" />
            <NewPostInputTextHelp>{renderDragMessage()}</NewPostInputTextHelp>
            <NewPostInputButton style={{ display: isDrag == "none" ? "block" : "none" }} onClick={() => inputRef.current?.click()}>
              Selecione da galeria
            </NewPostInputButton>
          </NewPostInputContainer>
          <NewPostPreview style={{ display: preview == null ? "none" : "flex" }}>
            <DeletePreview
              onClick={() => {
                setFile(undefined);
                setPreview(null);
                setIsDrag("none");
              }}
              src="/icons/close.svg"
            ></DeletePreview>
            <Preview src={preview || "/icons/close.svg"}></Preview>
          </NewPostPreview>
          <NewPostInfoContainer>
            <NewPostInfoUserSpan>
              <NewPostInfoPictureUser src={simpleProfile?.picture ?? "/png/remo.jpg"} />
              <NewPostInfoUsername>@{simpleProfile?.username}</NewPostInfoUsername>
            </NewPostInfoUserSpan>
            <NewPostInfoCaption placeholder="Escolha a melhor legenda para sua publicação" value={caption} onChange={captionSet}></NewPostInfoCaption>
            <NewPostInfoLimitText>{caption.length}/2000</NewPostInfoLimitText>
            <NewPostInfoInput placeholder="Deseja marcar alguem na publicação?" value={markUser} onChange={defineMarker}></NewPostInfoInput>
            <DataListContainer style={{ borderBottom: "1px solid black" }}>
              <DataListLabel>Quem pode ver essa publicação?</DataListLabel>
              <DataList value={optionVisibility} onChange={(e) => setOptionVisibility(e.currentTarget.value)}>
                {optionsVisibility.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </DataList>
            </DataListContainer>
            <DataListContainer>
              <DataListLabel>Quem pode ver comentar nesta publicação?</DataListLabel>
              <DataList value={optionComment} onChange={(e) => setOptionComment(e.currentTarget.value)}>
                {optionsComments.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </DataList>
            </DataListContainer>
            {loadContent ? (
              <NewPostPublish>
                {" "}
                <LoadingSpinner noText={true} text={""} style={{ width: "fit-content" }} size={50} />
              </NewPostPublish>
            ) : (
              <NewPostPublish onClick={publish}>Compartilhar</NewPostPublish>
            )}
          </NewPostInfoContainer>
          <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: "none" }} />
        </NewPostContainer>
      ) : (
        <NewPostContainer>
          <NewPostheader>
            <HeaderClose src="/icons/close.svg" onClick={close} />
            <HeaderTitle>Editar publicação</HeaderTitle>
          </NewPostheader>
          {load ? (
            <>
              <NewPostPreview>
                <Preview src={props.post.picture}></Preview>
              </NewPostPreview>
              <NewPostInfoContainer>
                <NewPostInfoUserSpan>
                  <NewPostInfoPictureUser src={simpleProfile?.picture ?? "/png/remo.jpg"} />
                  <NewPostInfoUsername>@{simpleProfile?.username}</NewPostInfoUsername>
                </NewPostInfoUserSpan>
                <NewPostInfoCaption
                  placeholder="Escolha a melhor legenda para sua publicação"
                  value={caption}
                  onChange={(e) => setCaption(e.currentTarget.value)}
                ></NewPostInfoCaption>
                <NewPostInfoLimitText>{caption.length}/2000</NewPostInfoLimitText>
                <NewPostInfoInput placeholder="Deseja marcar alguem na publicação?" value={markUser} onChange={defineMarker}></NewPostInfoInput>
                <DataListContainer style={{ borderBottom: "1px solid black" }}>
                  <DataListLabel>Quem pode ver essa publicação?</DataListLabel>
                  <DataList value={optionVisibility} onChange={(e) => setOptionVisibility(e.currentTarget.value)}>
                    {optionsVisibility.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </DataList>
                </DataListContainer>
                <DataListContainer>
                  <DataListLabel>Quem pode ver comentar nesta publicação?</DataListLabel>
                  <DataList value={optionComment} onChange={(e) => setOptionComment(e.currentTarget.value)}>
                    {optionsComments.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </DataList>
                </DataListContainer>
                <ButtonsSpan>
                  <NewPostDelete onClick={remove}>
                    <MySvg src="/icons/trash.svg"></MySvg>
                  </NewPostDelete>
                  <NewPostPublish onClick={update}>Atualizar</NewPostPublish>
                </ButtonsSpan>
              </NewPostInfoContainer>
            </>
          ) : (
            <LoadingSpinner
              text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando perfil", "Atualizando informações", "Verificando conexões"]}
            />
          )}
        </NewPostContainer>
      )}
    </>
  );
}
