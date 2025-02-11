"use client";
import { BackgroundModal, BackPage, TitleReset } from "./styled";
import { Dispatch, SetStateAction, useState } from "react";
import PwdComponent from "../formComponents/passwordField";
import { passwordIsNullAndMinSize, passwordIsSame, tokenMinSize } from "@/service/validateFields";
import { resetPassword } from "@/service/requests/reset";
import { showAlert } from "../alert/page";
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/enum/Routes";
import FormButton from "../formComponents/formButton";

type Prop = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  goCenter: () => void;
};

export default function Reset(prop: Prop) {
  const [sending, setSending] = useState<"sending" | "free">("free");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [localShow, setLocalShow] = useState<boolean>(prop.show);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function reset() {
    if (!passwordIsNullAndMinSize(password)) return;
    if (!passwordIsSame(password, passwordConfirm)) return;
    if (!tokenMinSize(token)) return;

    const result = await resetPassword(password, token || "");
    setSending("sending");
    showAlert(result.data?.message || "", result.success ? "success" : "error");
    setSending("free");

    if (result.success) {
      close();
      setTimeout(() => {
        router.replace(Routes.login);
      }, 310);
    }
  }

  function close() {
    setLocalShow(false);
    setTimeout(() => {
      prop.goCenter();
      prop.setShow(false);
    }, 300);
  }

  return (
    <BackgroundModal closed={localShow ? "closed" : "open"} side="right">
      <TitleReset>Redefinir senha</TitleReset>
      <BackPage src="/icons/arrow-left.svg" onClick={close}></BackPage>
      <PwdComponent style={{ height: "7vh", marginBottom: "0%" }} setPassword={setPassword} password={password} onEnter={reset}></PwdComponent>
      <PwdComponent
        style={{ height: "7vh", marginBottom: "0%" }}
        placeholder="confirme sua senha"
        setPassword={setPasswordConfirm}
        password={passwordConfirm}
        onEnter={reset}
      ></PwdComponent>
      <FormButton multiplier={1.7} function={reset} sending={sending}>
        Atualizar Senha
      </FormButton>
    </BackgroundModal>
  );
}
