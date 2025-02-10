"use client";
import { LoginButton } from "@/components/login/styles";
import { BackgroundModal, BackPage, TitleReset } from "./styled";
import { Dispatch, SetStateAction, useState } from "react";
import PwdComponent from "../formComponents/passwordField";
import { passwordIsNullAndMinSize, passwordIsSame, tokenMinSize } from "@/service/validateFields";
import { resetPassword } from "@/service/requests/reset";
import { showAlert } from "../alert/page";
import { useRouter, useSearchParams } from "next/navigation";
import { Routes } from "@/enum/Routes";

type Prop = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  goCenter: () => void;
};

export default function Reset(prop: Prop) {
  const [sending, setSending] = useState<"sending" | "free">("free");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function reset() {
    if (!passwordIsNullAndMinSize(password)) return;
    if (!passwordIsSame(password, passwordConfirm)) return;
    if (!tokenMinSize(token)) return;

    const result = await resetPassword(password, token || "");

    showAlert(result.data?.message || "", result.success ? "success" : "error");

    if (result.success) {
      close();
      setTimeout(() => {
        router.replace(Routes.login);
      }, 310);
    }
  }

  function close() {
    prop.setShow(false);
    setInterval(() => {
      prop.goCenter();
    }, 300);
  }

  return (
    <BackgroundModal closed={prop.show ? "closed" : "open"} side="right">
      <TitleReset>Redefinir senha</TitleReset>
      <BackPage src="/icons/arrow-left.svg" onClick={close}></BackPage>
      <PwdComponent setPassword={setPassword} password={password} onEnter={reset}></PwdComponent>
      <PwdComponent placeholder="confirme sua senha" setPassword={setPasswordConfirm} password={passwordConfirm} onEnter={reset}></PwdComponent>
      <LoginButton style={{ height: "10vh", marginTop: "0%" }} onClick={reset} sending={sending}>
        Atualizar Senha
      </LoginButton>
    </BackgroundModal>
  );
}
