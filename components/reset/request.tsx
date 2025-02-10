"use client";
import { InputText, SpanInputText } from "@/components/login/styles";
import { BackgroundModal, BackPageRight, ConfirmEmail, EmailSended, SendAnother, TitleReset } from "./styled";
import { Dispatch, SetStateAction, useState } from "react";
import { emailIsNullAndValid } from "@/service/validateFields";
import { requestReset } from "@/service/requests/reset";
import { showAlert } from "../alert/page";
import FormButton from "../formComponents/formButton";

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
    setSending("sending");
    const result = await requestReset(email);
    setSending("free");

    showAlert(result.data?.message || "", result.success ? "success" : "error");
    if (result.success) {
      setRequestSend((e) => !e);
    }
  }

  function close() {
    prop.setShow(false);
    setTimeout(() => {
      prop.goCenter();
    }, 300);
  }

  return (
    <BackgroundModal closed={prop.show ? "open" : "closed"} side="left">
      <BackPageRight
        src="/icons/arrow-right.svg"
        onClick={() => {
          close();
        }}
      ></BackPageRight>
      {requestSend == false ? (
        <>
          <TitleReset>Encontre sua conta</TitleReset>
          <SpanInputText style={{ height: "10vh", marginBottom: "0%" }}>
            <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email da conta"></InputText>
          </SpanInputText>

          <FormButton function={sendRequest} sending={sending}>
            Enviar email
          </FormButton>
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
