"use client";
import { JSX } from "react";
import { ContainerBody, FooterBody, HeaderBody, MainBody } from "./styled";

type Props = {
  header?: JSX.Element;
  main: JSX.Element;
  footer?: JSX.Element;
};

export default function LayoutBody(props: Props) {
  return (
    <ContainerBody>
      <HeaderBody>{props.header}</HeaderBody>
      <MainBody>{props.main}</MainBody>
      <FooterBody>{props.footer}</FooterBody>
    </ContainerBody>
  );
}
