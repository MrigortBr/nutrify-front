 "use client"
import { useEffect, useState } from "react";
import { Logo } from "../login/styles";
import { ContainerVerify, DivVerify, GifConfirm, VerifyText } from "./styled";
import LoadingSpinner from "../LoadingSpinner/page";
import { verifyAccount } from "@/service/requests/authenticate";
import { useSearchParams } from "next/navigation";
import { showAlert } from "../alert/page";
import { Routes } from "@/enum/Routes";
import { useRouter, usePathname } from "next/navigation";
import { CloseButton } from "../CardNutri/styled";
import { openModal } from "../MyCustomModal/page";
import MySvg from "../MySvg/page";

type Prop = {
    text: string
}

export function AlertInModal(prop: Prop){


    return (
        <DivVerify> 
            <CloseButton onClick={() => openModal(<></>)}>
                <MySvg src="/icons/close.svg" />
            </CloseButton>
            <VerifyText>Enviamos um e-mail para confirmar seu login. Verifique sua caixa de entrada e siga as instruções. Não esqueça de conferir o spam! </VerifyText>
            <GifConfirm src="/gif/check.gif"/> 
        </DivVerify>            
    )
}