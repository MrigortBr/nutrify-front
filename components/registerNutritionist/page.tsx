"use client";
import { useState } from "react";
import { ConatinerLogin, DivLogin, InputText, Logo, SpanInputText, TextLogin, CreateAccount, LineWidget, LoginWithGoogle, LogoGoogle } from "../login/styles";
import { showAlert } from "../alert/page";
import PwdComponent from "../formComponents/passwordField";
import { CRN, registerAPI, registerNutriAPI } from "@/service/requests/authenticate";
import FormButton from "../formComponents/formButton";
import { validateFormRegister } from "@/service/validateFields";
import { useRouter } from "next/navigation";
import { Routes } from "@/enum/Routes";
import { DataListRegister, SpanInputTextDouble } from "./styled";
import { openModal } from "../MyCustomModal/page";
import { AlertInModal } from "../alertInModal/page";

const crnList: CRN[] = [
  "CRN-1", // São Paulo
  "CRN-2", // Rio de Janeiro
  "CRN-3", // Minas Gerais
  "CRN-4", // Distrito Federal
  "CRN-5", // Paraná
  "CRN-6", // Santa Catarina
  "CRN-7", // Rio Grande do Sul
  "CRN-8", // Goiás
  "CRN-9", // Bahia
  "CRN-10", // Espírito Santo
  "CRN-11", // Pernambuco
];

export default function RegisterNutritionist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberCRN, setNumberCRN] = useState("");
  const [typeCRN, setTypeCRN] = useState<CRN>("CRN-11");
  const [sending, setSending] = useState<"sending" | "free">("free");
  const router = useRouter();

  //TODO CREATE CONECTION TO BACKEND
  async function register() {
    if (sending == "sending") return;
    if (!validateFormRegister(name, email, confirmEmail, password)) return;
    setSending("sending");
    const result = await registerNutriAPI({ name, email, password, typeCRN, crn: numberCRN });
    setSending("free");
    showAlert(result.data?.message || "", result.success ? "success" : "error");

    if (result.success) {
      // const jwt = result.data?.jwt;
      // if (jwt) localStorage.setItem("token", jwt);
      // else showAlert("Houve um erro tente fazer o login novamente", "warning");
      // router.push(Routes.home);
      openModal(<AlertInModal text=""/>)
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
        <SpanInputTextDouble>
          <InputText
            onKeyDown={(e) => e.key === "Enter" && register()}
            placeholder="Informe seu CRN"
            type="text"
            value={numberCRN}
            onChange={(e) => setNumberCRN(e.target.value)}
          />
          <DataListRegister value={typeCRN} onChange={(e) => setTypeCRN(e.currentTarget.value as CRN)}>
            {crnList.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </DataListRegister>
        </SpanInputTextDouble>
        <FormButton function={register} sending={sending}>
          Registrar
        </FormButton>
        <CreateAccount onClick={() => router.push(Routes.login)}>
          Tem uma conta? <b>Entre</b>
        </CreateAccount>
      </DivLogin>
    </ConatinerLogin>
  );
}
