import { Rating } from "@mui/material";
import { ItemButton, ItemHour, ItemImg, ItemName, ItemNameStar, ServiceConatiner, ServiceTable, ServiceTableItem, ServiceTitle } from "./styled";
import { useEffect, useState } from "react";
import { getServices, NutriLast, NutriOpen } from "@/service/requests/Nutri";
import { showAlert } from "../alert/page";
import { openModal } from "../MyCustomModal/page";
import CardNutri from "../CardNutri/page";

export default function ServiceComponent() {
  const [last, setLast] = useState<NutriOpen[]>([]);
  const [open, setOpen] = useState<NutriOpen[]>([]);

  async function getData() {
    const data = await getServices();

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.servicesLast) {
      console.log(data.data?.servicesLast);

      setLast(data.data?.servicesLast);
    }

    if (data.data?.servicesOpen) {
      setOpen(data.data.servicesOpen);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ServiceConatiner>
      <ServiceTitle>Atendimentos</ServiceTitle>
      <ServiceTable>
        {open.map((v, i) => (
          <ServiceTableItem key={i}>
            <ItemImg src={v.picture ?? "/png/remo.jpg"} />
            <ItemName>{v.name}</ItemName>
            <ItemHour>
              Horario marcado: {new Date(v.service_init).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </ItemHour>
            <ItemButton>Abrir chat</ItemButton>
          </ServiceTableItem>
        ))}
      </ServiceTable>
      <ServiceTitle>Atendimentos Finalizados</ServiceTitle>
      <ServiceTable>
        {last.map((v, i) => (
          <ServiceTableItem key={i}>
            <ItemImg src={v.picture ?? "/png/remo.jpg"} />
            <ItemName>{v.name}</ItemName>
            <ItemNameStar>
              Realizada em:{" "}
              {new Date(v.service_init).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </ItemNameStar>
            <ItemNameStar>
              Sua avaliação: <Rating name="half-rating" value={v.rating} precision={0.5} readOnly />
            </ItemNameStar>
            <ItemButton
              onClick={() =>
                openModal(
                  <CardNutri value={{ name: v.name, number_service: 0, nutri_id: Number(v.nutri_id), picture: v.picture, price: 0, rating: v.rating }} />
                )
              }
            >
              Verificar Nutricionista
            </ItemButton>
          </ServiceTableItem>
        ))}
      </ServiceTable>
    </ServiceConatiner>
  );
}
