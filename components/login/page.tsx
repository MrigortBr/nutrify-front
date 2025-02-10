"use client";
import { useEffect, useState } from "react";
import {
  ConatinerLogin,
  DivLogin,
  InputText,
  Logo,
  SpanInputText,
  TextLogin,
  ForgotPassword,
  CreateAccount,
  LoginWithGoogle,
  LogoGoogle,
  BackgroundLine,
  WidgetLine,
  LineText,
} from "./styles";
import { logInAPI } from "@/service/requests/authenticate";
import PwdComponent from "../formComponents/passwordField";
import { validateFormLogin } from "@/service/validateFields";
import { showAlert } from "../alert/page";
import FormButton from "../formComponents/formButton";
import { Routes } from "@/enum/Routes";
import { useRouter, useSearchParams } from "next/navigation";
import Request from "../reset/request";
import Reset from "../reset/reset";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState<"sending" | "free">("free");
  const [go, setGo] = useState<"left" | "center" | "right">("center");
  const [showReset, setShowReset] = useState<boolean>(false);
  const [showRequest, setShowRequest] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const searchParams = useSearchParams();

    if (searchParams.get("token")) {
      setShowReset(true);
      setGo("left");
    }
  }, []);

  function goCenter() {
    setGo("center");
  }

  async function login() {
    if (sending == "sending") return;
    if (!validateFormLogin(email, password)) return;
    setSending("sending");
    const result = await logInAPI({ email, password });
    setSending("free");

    showAlert(result.data?.message || "", result.success ? "success" : "error");
    if (result.success) {
      console.log(result.data?.jwt);
    }
  }

  return (
    <>
      <ConatinerLogin></ConatinerLogin>
      <Logo src="/png/logo.png" />
      <DivLogin go={go}>
        <TextLogin>ENTRAR</TextLogin>
        <SpanInputText>
          <InputText
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SpanInputText>
        <PwdComponent setPassword={setPassword} password={password} onEnter={login}></PwdComponent>
        <ForgotPassword
          onClick={() => {
            setShowRequest(true);
            setGo("right");
          }}
        >
          Esqueceu sua senha?{" "}
        </ForgotPassword>
        <FormButton function={login} sending={sending}>
          Entrar
        </FormButton>
        <CreateAccount onClick={() => router.push(Routes.register)}>
          Ainda não é registrado? <b>Cadastre-se</b>
        </CreateAccount>
        {/* <LineWidget side="left" />
        <LineWidget side="right" /> */}
        <BackgroundLine>
          <WidgetLine></WidgetLine>
          <LineText>OU</LineText>
        </BackgroundLine>
        <LoginWithGoogle>
          <LogoGoogle src="/png/googleLogo.png" />
          login com o google
        </LoginWithGoogle>
      </DivLogin>
      <span style={{ visibility: go == "left" ? "hidden" : "visible" }}>
        <Request show={showRequest} goCenter={goCenter} setShow={setShowRequest} />
      </span>
      {go == "left" ? <Reset show={showReset} goCenter={goCenter} setShow={setShowReset} /> : <></>}
    </>
  );
}
