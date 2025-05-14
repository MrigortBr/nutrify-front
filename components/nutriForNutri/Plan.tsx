import { useEffect, useState } from "react";
import RevenueComponent from "../NutriConfigComponents/Revenue";
import { PlanContainer, RevenueContent, RevenueList, RevenuesConatiner, RevenuesHeader, RevenuesListHeader } from "./styled";
import React from "react";
import PlanItemComponent from "../PlanItemComponent/page";
import { createRevenue, deleteRevenue, GetRevenues, Revenue, updateRevenue } from "../../service/requests/revenue";
import { showAlert } from "../alert/page";

export default function PlanComponent() {
  const [newRevenue, setNewRevenue] = useState(false);
  const [revenue, setRevenue] = useState<Revenue[]>([]);

  function cancel() {
    setNewRevenue(false);
  }

  async function getData() {
    const r = await GetRevenues();

    if (r.success) {
      if (r.data?.revenue) setRevenue(r.data?.revenue);
    }
  }

  async function finish(newData: Revenue) {
    const r = await updateRevenue(newData);

    showAlert(r.data?.message || "", r.success ? "success" : "error");

    if (r.success) {
      const newRevenues = revenue.filter((v) => v.id != newData.id);
      newRevenues.push(newData);
      setRevenue(newRevenues);
    }
  }

  async function create(newData: Revenue) {
    const r = await createRevenue(newData);

    showAlert(r.data?.message || "", r.success ? "success" : "error");

    if (r.success) {
      if (r.data?.id) newData.id = r.data?.id;
      setRevenue((v) => [newData, ...v]);
      setNewRevenue(false);
    }
  }

  async function remove(id: number) {
    const r = await deleteRevenue(id);

    showAlert(r.data?.message || "", r.success ? "success" : "error");

    if (r.success) {
      setRevenue((prevRevenues) => prevRevenues.filter((v) => v.id !== id));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <PlanContainer>
      <RevenuesConatiner>
        <RevenuesHeader>
          <h1>Receitas criadas</h1>
          <button onClick={() => setNewRevenue(true)}>Criar nova receita</button>
        </RevenuesHeader>
        <RevenueContent>
          {newRevenue ? (
            <RevenueComponent
              cancel={cancel}
              create={create}
              data={{ id: 0, picture: "", name: "", nameType: "", dateInit: "", dateFinal: "", kcal: 0, recipe: "" }}
              new={true}
            />
          ) : (
            <></>
          )}
          {revenue.map((v, i) => (
            <RevenueComponent key={v.id} finish={finish} remove={remove} data={v} new={false} />
          ))}

          {revenue.length == 0 && !newRevenue ? <h3 style={{ margin: "auto" }}>Sem Receitas, clique no botão criar nova receita</h3> : <></>}
        </RevenueContent>
      </RevenuesConatiner>
    </PlanContainer>
  );
}
