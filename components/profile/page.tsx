"use client";
import { useEffect, useRef, useState } from "react";
import MySvg from "../MySvg/page";
import {
  ProfileContainer,
  ProfileInfoContainer,
  UserBio,
  UserName,
  UserPicture,
  UserPictureContainer,
  UserRec,
  UserStats,
  UserStatsItem,
  UserUsername,
  UserButton,
  FirstLine,
  ProfileShowContainer,
  ProfileTypeContainer,
  ProfileTypeItemIconAndText,
  ProfilePictures,
  ProfilePicture,
  UserUsernameInput,
  UserBioTextArea,
  UserNameInput,
  UploadContainer,
  ProfilePictureSpan,
  PictureInfoSpan,
  PictureInfoSpanContent,
} from "./styled";
import { followAPI, picture, profileAPI, profileMarkedAPI, ProfileUser, simpleProfile, unfollowAPI, updateAPI } from "@/service/requests/profile";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/page";
import { showAlert } from "../alert/page";
import { allowedTypes } from "../ComponentPost/page";
import { Routes } from "@/enum/Routes";
import { openModal } from "../MyCustomModal/page";
import ConfigComponent from "../configComponent/page";
import ModalNewPost from "../modalNewPost/page";
import ModalEditPost from "../modalEditPost/page";

export default function ProfileComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileUser>();
  const [iFollowUser, setIFollow] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [loadContent, setLoadContent] = useState(false);
  const [loadFollow, setLoadFollow] = useState(false);
  const [markedPictures, setMarkedPicture] = useState<picture[]>([]);
  const [markedFinded, setMarkedFinded] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pageOnProfile, setPageOnProfile] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  async function follow() {
    if (profile) {
      setLoadFollow(true);
      const r = await followAPI(profile.username);
      if (!r.success) {
        showAlert(r.data?.message || "", "error");
        return;
      }
      setIFollow(true);
      setLoadFollow(false);
    }
  }

  async function unfollow() {
    if (profile) {
      setLoadFollow(true);
      const r = await unfollowAPI(profile.username);

      if (!r.success) {
        showAlert(r.data?.message || "", "error");
        return;
      }

      setIFollow(false);
      setLoadFollow(false);
    }
  }

  async function fileSended(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const imageBase64 = await convertAndValidateImage(selectedFile);
      if (imageBase64 != undefined) {
        setImg(imageBase64);
      }
    }
  }

  async function convertAndValidateImage(file: File): Promise<string | undefined> {
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

    if (newFile.size > 7 * 1024 * 1024) {
      showAlert("O tamanho maximo é de 7MB.", "warning");
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

  async function saveEdit() {
    let fieldChanged = false;

    if (profile) {
      if (img != profile.picture) {
        profile.picture = img;
        fieldChanged = true;
      }

      if (name != profile.name) {
        if (name.trim().length > 0) {
          profile.name = name;
          fieldChanged = true;
        } else {
          showAlert("Nome escolhido é invalido!", "error");
          return;
        }
      }

      if (username != profile.username) {
        if (username.trim().length > 0) {
          profile.username = username;
          fieldChanged = true;
        } else {
          showAlert("Nome de usuario escolhido é invalido!", "error");
          return;
        }
      }

      if (bio != profile.bio) {
        profile.bio = bio;
        fieldChanged = true;
      }

      if (fieldChanged) {
        const r = await updateAPI(profile);
        if (!r.success) {
          showAlert(r.data?.message || r.error || "", "error");
          return;
        }

        localStorage.setItem("simpleProfile", JSON.stringify({ name: profile.name, username: profile.username, picture: profile.picture }));
        showAlert(r.data?.message || "", "success");
      }

      setEditProfile(false);
    } else {
      showAlert("Perfil não encontrado, atualize a pagina e tente novamente!", "error");
      router.push(Routes.home);
    }
  }

  const getData = async () => {
    let username = searchParams.get("u");

    if (username == null) {
      const localData = localStorage.getItem("simpleProfile");
      if (localData) {
        const simpleProfile: simpleProfile = JSON.parse(localData);
        if (simpleProfile.username) {
          username = simpleProfile.username;
        }
      }
    }

    if (username != null) {
      const r = await profileAPI(username);

      if (!r.success) {
        showAlert("Perfil não encontrado", "error");
        router.push(Routes.home);
      }

      if (r.data?.profile) {
        setProfile(r.data.profile);
        setIFollow(r.data.profile.iFollow);
        setIsMyProfile(r.data.profile.isMyProfile);
        setName(r.data.profile.name);
        setImg(r.data.profile.picture);
        setUsername(r.data.profile.username);
        setBio(r.data.profile.bio);
        setLoading(false);
        console.log(r.data.profile);
      }
    } else {
      showAlert("Você precisar estar logado ou abrir um perfil valido!", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
    setLoading(true);
    setMarkedPicture([]);
    setMarkedFinded(false);
    setPageOnProfile(1);
  }, [searchParams]);

  async function openMarked() {
    if (!markedFinded) {
      setLoadContent(true);
      setPageOnProfile(2);
      const r = await profileMarkedAPI(username);

      if (!r.success) {
        showAlert(r.data?.message || "", "error");
      }

      setMarkedPicture(r.data?.picture || []);

      setLoadContent(false);
      setMarkedFinded(true);
    } else {
      setPageOnProfile(2);
    }
  }

  function openPlaning() {
    setLoadContent(false);
    setPageOnProfile(3);
  }

  function openPictures() {
    setPageOnProfile(1);
  }

  function openPost(id: number) {
    router.push(Routes.post + id);
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando perfil", "Atualizando informações", "Verificando conexões"]} />
      ) : (
        <ProfileContainer>
          <ProfileInfoContainer>
            <UserPictureContainer>
              <UploadContainer onClick={() => inputRef.current?.click()} style={{ display: editProfile ? "" : "none" }}>
                <MySvg src="/icons/upload.svg" />
              </UploadContainer>
              {editProfile ? <UserPicture src={img ?? "/png/remo.jpg"} /> : <UserPicture src={img ?? "/png/remo.jpg"} />}
            </UserPictureContainer>
            <FirstLine>
              {editProfile ? (
                <UserUsernameInput value={username} onChange={(e) => setUsername(e.currentTarget.value)}></UserUsernameInput>
              ) : (
                <UserUsername>@{username}</UserUsername>
              )}
              {!isMyProfile ? (
                <>
                  {loadFollow ? (
                    <UserButton>
                      {" "}
                      <LoadingSpinner noText={true} text={""} style={{ width: "fit-content" }} size={16} />
                    </UserButton>
                  ) : (
                    <>{iFollowUser ? <UserButton onClick={unfollow}>Seguindo</UserButton> : <UserButton onClick={follow}>Seguir</UserButton>}</>
                  )}
                  <UserButton>Mensagem</UserButton>
                </>
              ) : (
                <>
                  {editProfile ? (
                    <UserButton onClick={saveEdit}>Salvar edição</UserButton>
                  ) : (
                    <>
                      <UserButton onClick={() => setEditProfile(true)}>Editar</UserButton>
                      <UserButton onClick={() => openModal(<ConfigComponent />)}>Configurações</UserButton>
                    </>
                  )}
                </>
              )}
            </FirstLine>
            <UserStats>
              <UserStatsItem>
                <b>{profile?.pictures?.length || 0}</b> Publicações
              </UserStatsItem>
              <UserStatsItem>
                <b>{profile?.followers || 0}</b> Seguidores
              </UserStatsItem>
              <UserStatsItem>
                <b>{profile?.following || 0}</b> Seguindo
              </UserStatsItem>
            </UserStats>
            {editProfile ? <UserNameInput value={name} onChange={(e) => setName(e.currentTarget.value)}></UserNameInput> : <UserName>{name}</UserName>}
            {editProfile ? (
              <UserBioTextArea value={bio ?? ""} onChange={(e) => setBio(e.currentTarget.value)}></UserBioTextArea>
            ) : (
              <UserBio>{bio != undefined ? bio : "Nada a informar"}</UserBio>
            )}
            <UserRec>
              Seguido(a) por&nbsp;<b>{" @"}fulano</b>,&nbsp;<b>cicrano</b>&nbsp;e outras 15 pessoas
            </UserRec>
          </ProfileInfoContainer>
          <ProfileShowContainer>
            <ProfileTypeContainer $marker={pageOnProfile}>
              <ProfileTypeItemIconAndText onClick={openPictures}>
                <MySvg src="/icons/grid.svg" />
                Publicações
              </ProfileTypeItemIconAndText>
              <ProfileTypeItemIconAndText onClick={openMarked}>
                <MySvg src="/icons/users.svg" />
                Marcados
              </ProfileTypeItemIconAndText>
              <ProfileTypeItemIconAndText onClick={openPlaning}>
                <MySvg src="/icons/plus.svg" />
                Planejamento
              </ProfileTypeItemIconAndText>
            </ProfileTypeContainer>
            {pageOnProfile == 1 ? (
              <ProfilePictures>
                {profile?.pictures?.map((pic, index) => (
                  <ProfilePictureSpan key={index} onClick={() => (editProfile ? openModal(<ModalEditPost post={pic} />) : openPost(pic.id))}>
                    <ProfilePicture key={index} src={pic.picture} />
                    <PictureInfoSpan>
                      <PictureInfoSpanContent>
                        <MySvg src="/icons/heart.svg" />
                        <p>{pic.likes}</p>
                      </PictureInfoSpanContent>
                      <PictureInfoSpanContent>
                        <MySvg src="/icons/chat.svg" />
                        <p>{pic.comments}</p>
                      </PictureInfoSpanContent>
                    </PictureInfoSpan>
                  </ProfilePictureSpan>
                ))}
              </ProfilePictures>
            ) : (
              <></>
            )}
            {pageOnProfile == 2 ? (
              <>
                {!loadContent ? (
                  <ProfilePictures>
                    {markedPictures?.map((pic, index) => (
                      <ProfilePictureSpan key={index} onClick={() => (editProfile ? openModal(<ModalEditPost post={pic} />) : openPost(pic.id))}>
                        <ProfilePicture key={index} src={pic.picture} />
                        <PictureInfoSpan>
                          <PictureInfoSpanContent>
                            <MySvg src="/icons/heart.svg" />
                            <p>{pic.likes}</p>
                          </PictureInfoSpanContent>
                          <PictureInfoSpanContent>
                            <MySvg src="/icons/chat.svg" />
                            <p>{pic.comments}</p>
                          </PictureInfoSpanContent>
                        </PictureInfoSpan>
                      </ProfilePictureSpan>
                    ))}
                  </ProfilePictures>
                ) : (
                  <LoadingSpinner
                    style={{ width: "fit-content", marginTop: "15vh" }}
                    text={["Buscando fotos", "Lendo a bio", "Enviando dados", "Carregando perfil", "Atualizando informações", "Verificando conexões"]}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </ProfileShowContainer>
          {editProfile ? (
            <input type="file" ref={inputRef} onChange={fileSended} style={{ display: "none" }} accept="image/png, image/jpeg, image/gif, image/jpg" />
          ) : (
            <></>
          )}
        </ProfileContainer>
      )}
    </>
  );
}
