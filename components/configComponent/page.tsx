"use client";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import {
  ButtonSaveConfig,
  ConfigClose,
  ConfigContainer,
  ConfigGroup,
  ConfigGroupLabel,
  ConfigHeader,
  ConfigItem,
  ConfigText,
  ItemField,
  ItemInput,
  ItemLabel,
} from "./styled";
import MySvg from "../MySvg/page";
import { openModal } from "../MyCustomModal/page";
import { configUpdate, getConfigAPI, PrivacyLevel, updateConfigAPI } from "@/service/requests/profile";
import { showAlert } from "../alert/page";
import LoadingSpinner from "../LoadingSpinner/page";

const optionsComments = [
  { value: "*", label: "Público" },
  { value: "onlyFallowers", label: "Somente Seguidores" },
  { value: "onlyIFallow", label: "Somente Quem Eu Sigo" },
  { value: "fallowersAndIFallow", label: "Seguidores e Quem Eu Sigo" },
  { value: "onlyI", label: "Somente eu" },
];

type Props = {
  closeCall?: (tag: string) => void;
};

export default function ConfigComponent(props: Props) {
  const [load, setLoad] = useState(true);
  const [changeItens, setChangeItens] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [whoSendMessage, setWhoSendMessage] = useState("");
  const [whoSeeMyPosts, setWhoSeeMyPosts] = useState("");
  const [whoSeeMyPlanning, setWhoSeeMyPlanning] = useState("");
  const privacyInitial = useRef({
    whoSendMessage: "",
    whoSeeMyPosts: "",
    whoSeeMyPlanning: "",
  });
  const firstUse = useRef(true);

  function validateEmail(): boolean {
    const emailRegex = /@[a-zA-Z0-9-]+\.[a-zA-Z]+/;
    return emailRegex.test(newEmail);
  }

  function validatePassword(): boolean {
    return newPassword.length >= 6;
  }

  useEffect(() => {
    if (firstUse.current) {
      firstUse.current = false;
      return;
    }

    const messageIsSame = whoSendMessage == privacyInitial.current.whoSendMessage;
    const postIsSame = whoSeeMyPosts == privacyInitial.current.whoSeeMyPosts;
    const planningIsSame = whoSeeMyPlanning == privacyInitial.current.whoSeeMyPlanning;

    if (validatePassword() || validateEmail() || messageIsSame || planningIsSame || postIsSame) {
      setChangeItens(true);
    }

    if (!validatePassword() && !validateEmail() && messageIsSame && planningIsSame && postIsSame) {
      setChangeItens(false);
    }
  }, [newEmail, newPassword, whoSendMessage, whoSeeMyPosts, whoSeeMyPlanning]);

  useEffect(() => {
    const getData = async () => {
      const res = await getConfigAPI();

      if (!res.success) {
        showAlert(res.data?.message || "", "error");
        return;
      }

      if (res.data?.privacy) {
        setWhoSendMessage(res.data.privacy.whosendmessage);
        setWhoSeeMyPosts(res.data.privacy.whoseemyposts);
        setWhoSeeMyPlanning(res.data.privacy.whoseemyplanning);
        privacyInitial.current = {
          whoSendMessage: res.data.privacy.whosendmessage,
          whoSeeMyPosts: res.data.privacy.whoseemyposts,
          whoSeeMyPlanning: res.data.privacy.whoseemyplanning,
        };
        setLoad(false);
      }
    };

    getData();
  }, []);

  async function sendData() {
    const data: configUpdate = {
      email: newEmail,
      password: newPassword,
      whoseemyplanning: whoSeeMyPlanning as PrivacyLevel,
      whoseemyposts: whoSeeMyPosts as PrivacyLevel,
      whosendmessage: whoSendMessage as PrivacyLevel,
    };
    setLoad(true);
    const res = await updateConfigAPI(data);

    if (!res.success) {
      showAlert(res.data?.message || "", "error");
      return;
    }

    showAlert(res.data?.message || "", "success");
    setLoad(false);

    openModal(<></>);
  }

  function close() {
    if (props.closeCall) {
      props.closeCall(".gear.");
    }
    openModal(<></>);
  }

  return (
    <ConfigContainer>
      <ConfigHeader>
        <ConfigClose onClick={close}>
          <MySvg src="/icons/close.svg" />
        </ConfigClose>
        <ConfigText>Configurações</ConfigText>
      </ConfigHeader>
      {!load ? (
        <>
          <ConfigGroup>
            <ConfigGroupLabel>Visibilidade</ConfigGroupLabel>
            <ConfigItem>
              <ItemLabel>Quem pode ver minhas fotos</ItemLabel>
              <ItemInput value={whoSeeMyPosts} onChange={(e) => setWhoSeeMyPosts(e.currentTarget.value)}>
                {optionsComments.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </ItemInput>
            </ConfigItem>
            <ConfigItem>
              <ItemLabel>Quem pode me mandar mensagem</ItemLabel>
              <ItemInput value={whoSendMessage} onChange={(e) => setWhoSendMessage(e.currentTarget.value)}>
                {optionsComments.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </ItemInput>
            </ConfigItem>
            <ConfigItem>
              <ItemLabel>Quem pode ver meu planejamento</ItemLabel>
              <ItemInput value={whoSeeMyPlanning} onChange={(e) => setWhoSeeMyPlanning(e.currentTarget.value)}>
                {optionsComments.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </ItemInput>
            </ConfigItem>
          </ConfigGroup>
          <ConfigGroup>
            <ConfigGroupLabel>Visibilidade</ConfigGroupLabel>
            <ConfigItem>
              <ItemLabel>Trocar email:</ItemLabel>
              <ItemField value={newEmail} onChange={(e) => setNewEmail(e.currentTarget.value)} placeholder="Digite seu email" type="text"></ItemField>
            </ConfigItem>
            <ConfigItem>
              <ItemLabel>Trocar senha:</ItemLabel>
              <ItemField
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                placeholder="Digite sua nova senha"
                type="text"
              ></ItemField>
            </ConfigItem>
          </ConfigGroup>

          <ButtonSaveConfig $reverse={changeItens} onClick={sendData}>
            Salvar alterações
          </ButtonSaveConfig>
        </>
      ) : (
        <>
          <LoadingSpinner noText={true} style={{ width: "100%", margin: "auto", marginTop: "20vh" }} text={""} />
        </>
      )}
    </ConfigContainer>
  );
}
