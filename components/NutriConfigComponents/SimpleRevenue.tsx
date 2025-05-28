import { Revenue } from "@/service/requests/revenue";
import { useState } from "react";
import {
  LeftService,
  RevenueBody,
  RevenueImageSpan,
  RevenueImg,
  Service,
  ServiceDate,
  ServiceDateInput,
  SimpleRevenueContainer,
} from "../nutriForNutri/styled";
import React from "react";

type Prop = {
  data: Revenue;
  setSelected: (rev: Revenue, insert: boolean) => void;
};

export default function SimpleRevenue(props: Prop) {
  const [picture, setPicture] = useState<string>(props.data.picture);
  const [name, setName] = useState<string>(props.data.name);
  const [typeRevenue, setTypeRevenue] = useState<string>(props.data.nameType);
  const [initHour, setinitHour] = useState<string>(props.data.dateInit);
  const [finalHour, setFinalHour] = useState<string>(props.data.dateFinal);
  const [kcal, setKcal] = useState<number>(props.data.kcal);
  const [selected, setSelected] = useState<boolean>(false);

  function select() {
    props.setSelected(props.data, !selected);
    setSelected((e) => !e);
  }

  function formatHourMinute(date: string): string {
    const newD = new Date(date);
    const hours = newD.getUTCHours().toString().padStart(2, "0");
    const minutes = newD.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <SimpleRevenueContainer onClick={select} $selected={selected}>
      <RevenueBody>
        <RevenueImageSpan>
          <RevenueImg style={{ height: "100%" }} src={picture.trim() === "" ? "/icons/image.svg" : picture} />
        </RevenueImageSpan>
        <h1>{name}</h1>
        <h2>Refeição: {typeRevenue}</h2>
        <h3>
          Horario: {formatHourMinute(initHour)} - {formatHourMinute(finalHour)}
        </h3>
        <h4>Kcal: {kcal}</h4>
      </RevenueBody>
    </SimpleRevenueContainer>
  );
}
