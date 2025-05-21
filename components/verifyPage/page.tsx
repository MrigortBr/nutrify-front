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

export function VerifyPage(){
    const [checking, setChecking] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const getRequest = async (token: string) =>{
            const data = await verifyAccount(token)

            if (!data.success){

            }else{
                const jwt = data.data?.jwt;
                const type = data.data?.type;
                if (jwt) localStorage.setItem("token", jwt);
                else showAlert("Houve um erro tente fazer o login novamente", "warning");
                localStorage.setItem("type", type ?? "user");
                setChecking(false)
                setTimeout(() => {
                    router.push(Routes.home);
                }, 500);
            }

            showAlert(data.data?.message ?? "", data.success ? "success" : "error");

        }

        const token = searchParams.get("token");
        if (token){
            getRequest(token)
        }
    }, [router])

    return (
        <ContainerVerify>
            <Logo src="/png/logo.png" />
            <DivVerify>
                {checking ?
                <>
                <LoadingSpinner noText={false} text={"Verificando seu email, aguarde"} style={{ width: "fit-content" }} size={50} />
                </>:                 
                <>
                <VerifyText>Seu e-mail foi verificado com sucesso!</VerifyText>
                <GifConfirm src="/gif/check.gif"/>
                                </>
                    
                }
            </DivVerify>            
        </ContainerVerify>
    )
}