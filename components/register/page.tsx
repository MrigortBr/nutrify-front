"use client";
import { useState } from "react";
import { ConatinerLogin, DivLogin, InputText, Logo, SpanInputText, TextLogin, CreateAccount, LineWidget, LoginWithGoogle, LogoGoogle } from "../login/styles";
import { showAlert } from "../alert/page";
import PwdComponent from "../formComponents/passwordField";
import { registerAPI } from "@/service/requests/authenticate";
import FormButton from "../formComponents/formButton";
import { validateFormRegister } from "@/service/validateFields";
import { useRouter } from "next/navigation";
import { Routes } from "@/enum/Routes";

export default function LoginComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState<"sending" | "free">("free");
  const router = useRouter();

  async function register() {
    if (sending == "sending") return;
    if (!validateFormRegister(name, email, confirmEmail, password)) return;
    setSending("sending");
    const result = await registerAPI({ name, email, password });
    setSending("free");
    showAlert(result.data?.message || "", result.success ? "success" : "error");

    if (result.success) {
    }
  }

  return (
    <ConatinerLogin>
      <Logo src="/png/logo.png" />
      <DivLogin $go="center">
        <TextLogin>REGISTRAR</TextLogin>
        <SpanInputText>
          <InputText
            onKeyDown={(e) => e.key === "Enter" && register()}
            placeholder="nome completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SpanInputText>
        <SpanInputText>
          <InputText
            onKeyDown={(e) => e.key === "Enter" && register()}
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SpanInputText>
        <SpanInputText>
          <InputText
            onKeyDown={(e) => e.key === "Enter" && register()}
            placeholder="confirme seu email"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </SpanInputText>
        <PwdComponent setPassword={setPassword} password={password} onEnter={register}></PwdComponent>
        <FormButton function={register} sending={sending}>
          Registrar
        </FormButton>
        <CreateAccount onClick={() => router.push(Routes.login)}>
          Tem uma conta? <b>Entre</b>
        </CreateAccount>
        <LineWidget side="left" />
        <LineWidget side="right" />
        <LoginWithGoogle>
          <LogoGoogle src="/png/googleLogo.png" />
          Registrar pelo google
        </LoginWithGoogle>
      </DivLogin>
    </ConatinerLogin>
  );
}
