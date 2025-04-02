import { Rating } from "@mui/material";
import { ButtonSend, CardContainer, CloseButton, Hour, HoursContainer, HoursDate, HoursSpan, NutriInfo, NutriInfoImage, TotalValue } from "./styled";
import { useEffect, useState } from "react";
import MySvg from "../MySvg/page";
import { openModal } from "../MyCustomModal/page";
import { NutriSimple, setForHour } from "@/service/requests/Nutri";
import { formatCurrency } from "@/service/formatCurrency";
import { getHoursByid, HoursObject } from "@/service/requests/Hours";
import { showAlert } from "../alert/page";

type Prop = {
  value: NutriSimple;
};

export default function CardNutri(prop: Prop) {
  const [nutri, setNutri] = useState<NutriSimple>(prop.value);
  const [selected, SetSelected] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState<HoursObject[]>([]);

  async function selectHour() {
    const hour: HoursObject | undefined = hours.find((v) => v.id == selected);

    if (hour) {
      const data = await setForHour(nutri.nutri_id, hour.id);

      showAlert(data.data?.message ?? "", data.success ? "success" : "error");

      if (data.success) {
        openModal(<></>);
      }
    } else {
      showAlert("Selecione um horario", "info");
    }
  }

  async function getData() {
    const data = await getHoursByid(nutri.nutri_id, date);

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.hours) {
      setHours(data.data.hours);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <CardContainer>
      <NutriInfo>
        <NutriInfoImage src={nutri.picture ?? "/png/remo.jpg"} alt="" />
        <h1>{nutri.name}</h1>
        <h2>Preço por hora: {formatCurrency(nutri.price)}</h2>
        <span>
          Nota:
          <Rating name="half-rating" value={nutri.rating} precision={0.5} readOnly />
        </span>
      </NutriInfo>
      <HoursContainer>
        <span>
          Ecolha Data:
          <HoursDate type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
        </span>
        <HoursSpan>
          {hours.map((v, i) => (
            <Hour
              key={i}
              $selected={selected == v.id}
              onClick={() => {
                if (selected == v.id) {
                  SetSelected(0);
                } else {
                  SetSelected(v.id);
                }
              }}
            >
              {new Date(v.service_init).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </Hour>
          ))}
        </HoursSpan>
      </HoursContainer>
      <ButtonSend $ican={selected != 0} onClick={selectHour}>
        Solicitar Horario
      </ButtonSend>
      <CloseButton onClick={() => openModal(<></>)}>
        <MySvg src="/icons/close.svg" />
      </CloseButton>
    </CardContainer>
  );
}
