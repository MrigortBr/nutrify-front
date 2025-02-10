"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { IconPassword, InputText, SpanInputText } from "../login/styles";

type Props = {
  setPassword: Dispatch<SetStateAction<string>>;
  password: string;
  onEnter: () => void;
  placeholder?: string;
};

export default function PwdComponent(props: Props) {
  const [pwdShow, setPwdShow] = useState<"show" | "hidden">("hidden");

  function handlStatePassword() {
    if (pwdShow == "hidden") setPwdShow("show");
    else setPwdShow("hidden");
  }

  return (
    <SpanInputText>
      <InputText
        onKeyDown={(e) => e.key === "Enter" && props.onEnter()}
        className="pwd"
        placeholder={props.placeholder || "senha"}
        type={pwdShow == "hidden" ? "text" : "password"}
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
      />
      <IconPassword
        src="/icons/hidden.svg"
        onClick={handlStatePassword}
        style={{ display: pwdShow == "hidden" && props.password.length > 0 ? "inline" : "none" }}
      />
      <IconPassword
        src="/icons/show.svg"
        onClick={handlStatePassword}
        style={{ display: pwdShow == "show" && props.password.length > 0 ? "inline" : "none" }}
      />
    </SpanInputText>
  );
}
