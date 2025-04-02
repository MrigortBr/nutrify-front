"use client";

import { useState } from "react";
import {
  NutriComponent,
  NutriNav,
  Service,
  Stats,
  StatsInfo,
  StatsNumber,
  StatusDesc,
  User,
  UserButton,
  UserButtonsDiv,
  UserDescription,
  UserHour,
  UserImg,
  UserTitle,
} from "./styled";
import MySvg from "../MySvg/page";
import StatsComponent from "./Stats";
import { ServiceComponent } from "./Service";
import { ConfigComponent } from "./Config";
import PlanComponent from "./Plan";

export default function NutriForNutri() {
  const [page, setPage] = useState(1);
  return (
    <NutriComponent>
      <NutriNav $element={page}>
        <p onClick={() => setPage(1)} className={page == 1 ? "selected" : ""}>
          Visão geral
        </p>
        <p onClick={() => setPage(2)} className={page == 2 ? "selected" : ""}>
          Atendimentos
        </p>
        <p onClick={() => setPage(3)} className={page == 3 ? "selected" : ""}>
          Planejamentos
        </p>
        <p onClick={() => setPage(4)} className={page == 4 ? "selected" : ""}>
          Configurações
        </p>
      </NutriNav>
      {page == 1 ? <StatsComponent /> : <></>}
      {page == 2 ? <ServiceComponent /> : <></>}
      {page == 3 ? <PlanComponent /> : <></>}
      {page == 4 ? <ConfigComponent /> : <></>}
    </NutriComponent>
  );
}
