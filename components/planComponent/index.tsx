import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  NoPlan,
  PlanAddDiv,
  PlanAddSelect,
  PlanButton,
  PlanCarrousel,
  PlanContainer,
  PlanDate,
  PlanDateDate,
  PlanDateSpan,
  PlanEditOrCreate,
  PlanItem,
  PlanItemDescription,
  PlanItemImg,
  PlanItemRecipe,
  PlanItemTitle,
  PlanType,
} from "./styled";
import PlanItemComponent from "../PlanItemComponent/page";
import DatePicker from "react-datepicker";
import MySvg from "../MySvg/page";
import { getPlanAPI, planFood } from "@/service/requests/Plan";
import LoadingSpinner from "../LoadingSpinner/page";
import { showAlert } from "../alert/page";
import { DateToPlanFood } from "../profile/page";

export type props = {
  planFinded: DateToPlanFood[];
  setPlanFinded: Dispatch<SetStateAction<DateToPlanFood[]>>;
  username: string;
  isMyProfile: boolean;
};

const pNew: planFood = {
  id: 0,
  dateInit: new Date("2025-03-17T08:00:00"),
  dateFinal: new Date("2025-03-17T09:00:00"),
  name: "",
  nameType: "",
  recipe: "",
  picture: "",
  marked: false,
};

export function PlanComponent(props: props) {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [haveNew, setHaveNew] = useState<boolean>(false);
  const [newPlan, setNewPlan] = useState<planFood>(pNew);
  const [plansFood, setPlansFood] = useState<planFood[]>([]);
  const [showText, setShowText] = useState<number>(-1);
  const refPlanOne = useRef<HTMLDivElement>(null);
  const refPlanTwo = useRef<HTMLDivElement>(null);
  const refPlanThree = useRef<HTMLDivElement>(null);
  const refTimeOne = useRef<NodeJS.Timeout>(null);
  const refTimeTwo = useRef<NodeJS.Timeout>(null);
  const refTimeThree = useRef<NodeJS.Timeout>(null);
  const [load, setLoad] = useState<boolean>(true);

  const getData = async () => {
    const r = await getPlanAPI(props.username, date);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    }

    if (r.data?.plans) {
      setLoad(false);
      const newPlans = { plan: r.data.plans, date: date };
      props.setPlanFinded((e) => [...e, newPlans]);
      setPlansFood(r.data.plans);
    }
  };

  function cancelNew() {
    setHaveNew(false);
    setNewPlan(pNew);
  }

  function addNew(plan: planFood) {
    setHaveNew(false);
    setNewPlan(pNew);
    plansFood.push(plan);
  }

  function deletePlan(id: number) {
    setPlansFood((e) => e.filter((o) => o.id != id));
  }

  function updatePlan(plan: planFood) {
    const oldPlan = plansFood.find((v) => v.id == plan.id);
    if (oldPlan) {
      oldPlan.dateFinal = plan.dateFinal;
      oldPlan.dateInit = plan.dateInit;
      oldPlan.marked = plan.marked;
      oldPlan.name = plan.name;
      oldPlan.nameType = plan.nameType;
      oldPlan.picture = plan.picture;
      oldPlan.recipe = plan.picture;
    }
  }

  function iHaveThiData() {
    const s: DateToPlanFood | undefined = props.planFinded.find((e) => e.date == date);

    if (s) {
      if (s?.plan.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function ifIHave() {
    if (!iHaveThiData()) {
      getData();
    } else {
      const datePlan = props.planFinded.find((e) => e.date == date);
      setPlansFood(datePlan?.plan ?? []);
    }
  }

  useEffect(() => {
    ifIHave();
  }, []);

  useEffect(() => {
    setHaveNew(false);
    setNewPlan(pNew);
    setLoad(false);
  }, [plansFood]);

  useEffect(() => {
    ifIHave();
    setLoad(true);
  }, [date]);

  function changeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
  }

  function handleClick() {
    setHaveNew(true);
  }

  return (
    <>
      {!load ? (
        <PlanContainer>
          <PlanDateSpan>
            <PlanDateDate>
              <p>Data: </p>
              <PlanDate type="date" value={date} onChange={(e) => changeDate(e)}></PlanDate>
            </PlanDateDate>
            {props.isMyProfile ? (
              <PlanEditOrCreate>
                <PlanAddDiv ref={refPlanOne} onMouseEnter={() => setShowText(0)} onMouseLeave={() => setShowText(-1)} onClick={handleClick}>
                  <MySvg src="/icons/plus.svg" />
                  {showText == 0 ? "Adicionar Novo" : ""}
                </PlanAddDiv>
                <PlanAddDiv ref={refPlanTwo} onMouseEnter={() => setShowText(1)} onMouseLeave={() => setShowText(-1)}>
                  <MySvg src="/icons/gear.svg" />
                  {showText == 1 ? "Configurações" : ""}
                </PlanAddDiv>
                <PlanAddDiv ref={refPlanThree} onMouseEnter={() => setShowText(2)} onMouseLeave={() => setShowText(-1)}>
                  <MySvg src="/icons/share.svg" />
                  {showText == 2 ? "Compartilhar" : ""}
                </PlanAddDiv>
              </PlanEditOrCreate>
            ) : (
              <></>
            )}
          </PlanDateSpan>

          {plansFood.length > 0 || haveNew ? (
            <PlanCarrousel>
              {haveNew ? (
                <PlanItemComponent
                  plan={newPlan}
                  key={newPlan.id}
                  new={true}
                  date={date}
                  isMyProfile={props.isMyProfile}
                  addNew={addNew}
                  cancelNew={cancelNew}
                  update={updatePlan}
                  deletePlan={deletePlan}
                />
              ) : (
                <></>
              )}
              {plansFood
                .sort((a, b) => {
                  const dateA = new Date(a.dateInit); // Convertendo para Date
                  const dateB = new Date(b.dateInit); // Convertendo para Date
                  return dateA.getTime() - dateB.getTime(); // Compara as datas
                })
                .map(
                  (v, i) =>
                    v.id !== 0 ? (
                      <PlanItemComponent
                        plan={v}
                        key={v.id}
                        new={false}
                        date={date}
                        isMyProfile={props.isMyProfile}
                        addNew={addNew}
                        cancelNew={cancelNew}
                        update={updatePlan}
                        deletePlan={deletePlan}
                      />
                    ) : null // Caso v.id seja 0, não renderiza nada
                )}
            </PlanCarrousel>
          ) : (
            <NoPlan>Sem planejamento</NoPlan>
          )}
        </PlanContainer>
      ) : (
        <LoadingSpinner text={""} noText={true}></LoadingSpinner>
      )}
    </>
  );
}
