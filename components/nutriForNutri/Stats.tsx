import { useEffect, useState } from "react";
import { Stats, StatsInfo, StatsNumber, StatusDesc } from "./styled";
import { overview } from "@/service/requests/Hours";
import React from "react";
import { showAlert } from "../alert/page";
import { Rating } from "@mui/material";
import { formatCurrency } from "@/service/formatCurrency";

export default function StatsComponent() {
  const [service, setService] = useState(0);
  const [sales, setSales] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const r = await overview();
      if (r.success) {
        if (r.data) {
          setSales(r.data.nutriOverview?.sales ?? 0);
          setService(r.data.nutriOverview?.services ?? 0);
          setRating(r.data.nutriOverview?.rating ?? 0);
        }
      } else {
        showAlert(r.data?.message || "", r.success ? "success" : "error");
      }
    };
    getData();
  });

  return (
    <>
      <Stats>
        <StatsInfo>
          <StatsNumber>{service}</StatsNumber>
          <StatusDesc>Atendimentos</StatusDesc>
        </StatsInfo>
        <StatsInfo>
          <StatsNumber>{formatCurrency(sales)}</StatsNumber>
          <StatusDesc>Vendas</StatusDesc>
        </StatsInfo>
        <StatsInfo>
          <StatsNumber>
            <Rating value={rating} onChange={(e, v) => setRating(v ?? 0)} precision={0.5} readOnly={true}></Rating>
          </StatsNumber>
          <StatusDesc>Avaliações</StatusDesc>
        </StatsInfo>
      </Stats>
    </>
  );
}
