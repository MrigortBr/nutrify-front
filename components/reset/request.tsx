"use client";
import { ForgotPassword, InputText, SpanInputText } from "@/components/login/styles";
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
  const [localShow, setLocalShow] = useState<boolean>(prop.show);

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
    setLocalShow(false);
    setTimeout(() => {
      prop.setShow(false);
      prop.goCenter();
    }, 300);
  }

  return (
    <BackgroundModal closed={localShow ? "open" : "closed"} side="left">
      <BackPageRight
        src="/icons/arrow-right.svg"
        onClick={() => {
          close();
        }}
      ></BackPageRight>
      {requestSend == false ? (
        <>
          <TitleReset $animation={"hidden"}>Encontre sua conta</TitleReset>
          <ForgotPassword style={{ cursor: "context-menu" }}>Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.</ForgotPassword>
          <SpanInputText style={{ height: "7vh", marginBottom: "0%" }}>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email da conta"
              onKeyDown={(e) => e.key === "Enter" && sendRequest()}
            ></InputText>
          </SpanInputText>
          <FormButton multiplier={1.7} function={sendRequest} sending={sending}>
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
