"use client";
import { JSX, useState } from "react";
import { ContainerBody, FooterBody, HeaderBody, MainBody } from "./styled";
import MyModal from "@/components/MyCustomModal/page";

type Props = {
  header?: JSX.Element;
  main: JSX.Element;
  footer?: JSX.Element;
};

export default function LayoutBody(props: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  return (
    <ContainerBody>
      <HeaderBody>{isMobile ? <></> : props.header}</HeaderBody>
      <MainBody>{props.main}</MainBody>
      <FooterBody>{props.footer}</FooterBody>
      <MyModal />
    </ContainerBody>
  );
}
