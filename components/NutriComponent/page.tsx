"use client";

import { useEffect, useState } from "react";
import NutriForNutri from "../nutriForNutri/page";
import { getUserBySimpleProfile, SimpleProfile } from "@/service/localStorage/service";
import { codesErrors, loadError } from "@/service/errors";
import LoadingSpinner from "../LoadingSpinner/page";
import { NutriContainer } from "./styled";
import { NutriForUserComponent } from "../nutriForUser/page";

export default function NutriComponent() {
  const [simpleProfile, setSimpleProfile] = useState<SimpleProfile | undefined>(undefined);

  useEffect(() => {
    const getSimple = async () => {
      await getUserBySimpleProfile().then((e: SimpleProfile) => {
        setSimpleProfile(e);
      });
    };

    getSimple();
  }, []);

  return (
    <NutriContainer>
      {simpleProfile ? (
        <>{simpleProfile.typeUser == "nutri" ? <NutriForNutri /> : <NutriForUserComponent />}</>
      ) : (
        <LoadingSpinner text={"Lendo dados"}></LoadingSpinner>
      )}
    </NutriContainer>
  );
}
