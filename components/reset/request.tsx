"use client";
import { InputText, LoginButton, SpanInputText } from "@/components/login/styles";
import { BackgroundModal, BackPageRight, ConfirmEmail, EmailSended, SendAnother, TitleReset } from "./styled";
import { Dispatch, SetStateAction, useState } from "react";
import { emailIsNullAndValid } from "@/service/validateFields";
import { requestReset } from "@/service/requests/reset";
import { showAlert } from "../alert/page";

type Prop = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  goCenter: () => void;
};

export default function Request(prop: Prop) {
  const [sending, setSending] = useState<"sending" | "free">("free");
  const [requestSend, setRequestSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  async function sendRequest() {
    if (!emailIsNullAndValid(email)) return;

    const result = await requestReset(email);

    showAlert(result.data?.message || "", result.success ? "success" : "error");
    if (result.success) {
      setRequestSend((e) => !e);
    }
  }

  return (
    <BackgroundModal closed={prop.show ? "open" : "closed"} side="left">
      <BackPageRight
        src="/icons/arrow-right.svg"
        onClick={() => {
          prop.setShow(false);
          prop.goCenter();
        }}
      ></BackPageRight>
      {requestSend == false ? (
        <>
          <TitleReset>Encontre sua conta</TitleReset>
          <SpanInputText style={{ height: "10vh", marginBottom: "0%" }}>
            <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email da conta"></InputText>
          </SpanInputText>
          <LoginButton style={{ height: "10vh", marginTop: "0%" }} onClick={sendRequest} sending={sending}>
            Enviar email
          </LoginButton>
        </>
      ) : (
        <>
          <TitleReset>Email Enviado</TitleReset>
          <EmailSended src="/gif/email-send.gif"></EmailSended>
          <ConfirmEmail>
            <b>Confira seu e-mail!</b> Enviamos um link para que você possa redefinir sua senha com segurança.
          </ConfirmEmail>
          <SendAnother>
            Se não recebeu o e-mail, <b onClick={() => setRequestSend((e) => !e)}>clique aqui</b> para reenviar.
          </SendAnother>
        </>
      )}
    </BackgroundModal>
  );
}
