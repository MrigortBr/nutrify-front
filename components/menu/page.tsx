"use client";

import { useEffect, useState } from "react";
import {
  ComponentIcon,
  ComponentText,
  ImageMenu,
  LogoMenu,
  MenuComponent,
  MenuContainer,
  TextLogoMenu,
  UserInfo,
  UserName,
  UserPicture,
  UserPictureContainer,
  UserSign,
} from "./styled";
import { profileSimpleAPI, simpleProfile } from "@/service/requests/profile";
import { showAlert } from "../alert/page";
import LoadingSpinner from "../LoadingSpinner/page";
import { useRouter, usePathname } from "next/navigation";
import { Routes } from "@/enum/Routes";
import { openModal } from "../MyCustomModal/page";
import ConfigComponent from "../configComponent/page";
import NewPost from "../newPost/page";
import ComponentPost from "../ComponentPost/page";
import ModalNewPost from "../modalNewPost/page";

export default function Index() {
  const [usePage, setUsePage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const getSimpleMenu = async () => {
      let simpleProfile: simpleProfile | undefined;

      const localData = localStorage.getItem("simpleProfile");

      if (localData) {
        simpleProfile = JSON.parse(localData);
      }

      if (!simpleProfile) {
        const response = await profileSimpleAPI();

        if (!response.success) {
          router.push(Routes.login);
          localStorage.removeItem("simpleProfile");
          localStorage.removeItem("token");
          return;
        }

        simpleProfile = response.data?.simpleProfile;
      }

      if (simpleProfile) {
        localStorage.setItem("simpleProfile", JSON.stringify(simpleProfile));
        setName(simpleProfile.name);
        setUsername(simpleProfile.username);
        setPicture(simpleProfile.picture);
        setLoad(false);
      }
    };
    detectPathName();
    getSimpleMenu();
  }, []);

  function detectPathName() {
    if (pathname == "/home") {
      setUsePage(".house.");
    }
  }

  function goTo(tag: string, route: string) {
    setUsePage((e) => (e += tag));
    router.push(route);
  }

  function signOut() {
    localStorage.removeItem("simpleProfile");
    localStorage.removeItem("token");
    router.push(Routes.login);
  }

  function closeCall(tag: string) {
    const newTag = usePage.replace(tag, "");
    setUsePage(newTag);
  }

  return (
    <MenuContainer>
      <LogoMenu>
        <ImageMenu src="/png/logo.png"></ImageMenu>
        <TextLogoMenu>NUTRIFY</TextLogoMenu>
      </LogoMenu>

      {!load ? (
        <>
          <UserInfo onClick={() => router.push(Routes.profile)}>
            <UserPictureContainer>
              <UserPicture src={picture ?? "/png/remo.jpg"} />
            </UserPictureContainer>
            <UserName>{name}</UserName>
            <UserSign>@{username}</UserSign>
          </UserInfo>
        </>
      ) : (
        <UserInfo style={{ backgroundColor: "", display: "flex", alignItems: "center" }}>
          <LoadingSpinner noText={true} style={{ width: "100%", margin: "auto" }} text={""} />
        </UserInfo>
      )}

      <MenuComponent $select={usePage.search(".house.") != -1 ? true : false} onClick={() => goTo(".house.", Routes.home)}>
        <ComponentIcon src="/icons/house.svg" />
        <ComponentText>Página Inicial</ComponentText>
      </MenuComponent>

      <MenuComponent $select={usePage.search(".search.") != -1 ? true : false} onClick={() => showAlert("Função em desenvolvimento", "info")}>
        <ComponentIcon src="/icons/search.svg" />
        <ComponentText>Buscar</ComponentText>
      </MenuComponent>

      <MenuComponent $select={usePage.search(".alert.") != -1 ? true : false} onClick={() => showAlert("Função em desenvolvimento", "info")}>
        <ComponentIcon src="/icons/alert.svg" />
        <ComponentText>Notificações</ComponentText>
      </MenuComponent>

      <MenuComponent $select={usePage.search(".message.") != -1 ? true : false} onClick={() => showAlert("Função em desenvolvimento", "info")}>
        <ComponentIcon src="/icons/chat-message.svg" />
        <ComponentText>Mensagens</ComponentText>
      </MenuComponent>

      <MenuComponent
        $select={usePage.search(".plus.") != -1 ? true : false}
        onClick={() => {
          setUsePage((e) => (e += ".plus."));
          openModal(<ModalNewPost closeCall={closeCall} />);
        }}
      >
        <ComponentIcon src="/icons/plus.svg" />
        <ComponentText>Post</ComponentText>
      </MenuComponent>

      <MenuComponent
        $select={usePage.search(".gear.") != -1 ? true : false}
        onClick={() => {
          setUsePage((e) => (e += ".gear."));
          openModal(<ConfigComponent closeCall={closeCall}></ConfigComponent>);
        }}
      >
        <ComponentIcon src="/icons/gear.svg" />
        <ComponentText>Configurações</ComponentText>
      </MenuComponent>

      <MenuComponent $select={usePage.search(".exit.") != -1 ? true : false} onClick={signOut} style={{ marginTop: "16vh" }}>
        <ComponentIcon src="/icons/exit.svg" />
        <ComponentText>Sair</ComponentText>
      </MenuComponent>
    </MenuContainer>
  );
}
