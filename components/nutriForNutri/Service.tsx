import { useEffect, useState } from "react";
import {
  CenterService,
  ContainerRevenues,
  LeftBar,
  LeftService,
  MyRevenues,
  RevenuesButtons,
  RevenuesButtonsButton,
  RigthBar,
  Service,
  ServiceDate,
  ServiceDateInput,
  ServiceDateTwo,
  User,
  UserButton,
  UserButtonsDiv,
  UserDescription,
  UserHour,
  UserImg,
  UsersService,
  UserTitle,
} from "./styled";
import { getServicesNutri, NutriLast, NutriOpen } from "@/service/requests/Nutri";
import { showAlert } from "../alert/page";
import MySvg from "../MySvg/page";
import { createRevenueUser, GetRevenues, getRevenueUser, Revenue } from "@/service/requests/revenue";
import RevenueComponent from "../NutriConfigComponents/Revenue";
import SimpleRevenue from "../NutriConfigComponents/SimpleRevenue";
import ChatNutriComponent from "../modalChat/ChatNutri";

export function ServiceComponent() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [last, setLast] = useState<NutriOpen[]>([]);
  const [open, setOpen] = useState<NutriOpen[]>([]);
  const [planUser, setPlanUser] = useState<Revenue[]>([]);
  const [dateRevenue, setDateRevenue] = useState(new Date().toISOString().split("T")[0]);
  const [iCan, setICan] = useState<"yes" | "no" | "wait">("wait");
  const [revenues, setRevenue] = useState<Revenue[]>([]);
  const [selecteds, setSeletecteds] = useState<Revenue[]>([]);
  const [userId, setUserId] = useState(0);
  const [client, setClient] = useState<NutriOpen>();
  const [type, setType] = useState<"chat" | "revenues">("revenues");

  function combineDateAndTime(date: string, time: string): Date {
    // Combine a data com a hora para o formato 'YYYY-MM-DDTHH:MM:SS'
    const combinedDateTime = `${date}T${time.split("T")[1]}`;
    return new Date(combinedDateTime); // Retorna a data no formato Date
  }

  async function getMyData() {
    const r = await GetRevenues();
    if (r.success) {
      if (r.data?.revenue) setRevenue(r.data.revenue);
    }
  }

  async function setRevenuesUser() {
    selecteds.map((v) => {
      v.dateFinal = combineDateAndTime(dateRevenue, v.dateFinal).toISOString();
      v.dateInit = combineDateAndTime(dateRevenue, v.dateInit).toISOString();
    });

    const r = await createRevenueUser(selecteds, userId);

    showAlert(r.data?.message || "", r.success ? "success" : "error");
  }

  async function addSelected(rev: Revenue, insert: boolean) {
    if (insert) {
      setSeletecteds((e) => [rev, ...e]);
    } else {
      const newRev = selecteds.filter((e) => e.id != rev.id);
      setSeletecteds(newRev);
    }
  }

  async function getData() {
    const data = await getServicesNutri(date);

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.servicesLast) {
      setLast(data.data.servicesLast);
    }

    if (data.data?.servicesOpen) {
      setOpen(data.data.servicesOpen);
    }
  }

  async function getDataByData(dat: string) {
    const data = await getServicesNutri(dat);

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.servicesLast) {
      setLast(data.data.servicesLast);
    }

    if (data.data?.servicesOpen) {
      setOpen(data.data.servicesOpen);
    }
  }

  useEffect(() => {
    getData();
    getMyData();
  }, []);

  async function openRevenuesUser(user: NutriOpen) {
    const id = user.user_id;
    const r = await getRevenueUser(id, dateRevenue);

    if (r.success) {
      if (r.data?.description == ".") {
        setUserId(id);
        setICan("yes");
        setClient(user);
        if (r.data.revenue) setPlanUser(r.data.revenue);
      }
    } else {
      showAlert(r.data?.message || "", r.success ? "success" : "error");
    }
  }

  return (
    <Service>
      <LeftService>
        <ServiceDate>
          <div>
            <p>Data: </p>
            <ServiceDateInput
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.currentTarget.value);
                getDataByData(e.currentTarget.value);
              }}
            />
          </div>
        </ServiceDate>
        <UsersService>
          {open.map((v, i) => (
            <User key={i + "open"} onClick={() => openRevenuesUser(v)}>
              <UserImg src={v.picture ?? "/png/remo.jpg"} />
              <UserTitle>{v.name}</UserTitle>
              <UserHour>
                Horario: {new Date(v.service_init).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </UserHour>
            </User>
          ))}

          {last.map((v, i) => (
            <User key={i + "last"} onClick={() => openRevenuesUser(v)}>
              <UserImg src={v.picture ?? "/png/remo.jpg"} />
              <UserTitle>{v.name}</UserTitle>
              <UserHour>Finalizado em: {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</UserHour>
            </User>
          ))}
        </UsersService>
      </LeftService>
      <CenterService $grid={iCan}>
        {iCan == "wait" ? (
          <>
            <MySvg src="/icons/user.svg" />
            <h1>Escolha um usuário para poder fazer o planejamento.</h1>
            <h2>Obs: os planejamentos só ficam disponíveis até 48 horas após a consulta</h2>
          </>
        ) : iCan == "no" ? (
          <>
            <MySvg src="/icons/user.svg" />
            <h1>Você não tem permissão de alterar este usuario.</h1>
            <h2>Já se passaram 48 horas após seu atendimento a ele(a)</h2>
          </>
        ) : (
          <>
            {type == "chat" ? (
              <>
                {client ? (
                  <ChatNutriComponent
                    name={client.name}
                    nutriId={client.nutri_id}
                    picture={client.picture}
                    key={`client${client.user_id}`}
                    username={client.username}
                    full={true}
                    id={client.id}
                    type="nutri"
                    finished={client.finished}
                    close={client.rating}
                    closeChat={() => {
                      setClient(undefined);
                      setICan("wait");
                    }}
                  />
                ) : (
                  <></>
                )}
                <RigthBar onClick={() => setType("revenues")}>
                  <MySvg src="icons/arrow-right.svg" />
                </RigthBar>{" "}
              </>
            ) : (
              <>
                <ContainerRevenues>
                  <h1>Suas receitas</h1>
                  <ServiceDateTwo>
                    <div>
                      <p>Data: </p>
                      <ServiceDateInput
                        type="date"
                        value={dateRevenue}
                        onChange={(e) => {
                          setDateRevenue(e.currentTarget.value);
                          getData();
                        }}
                      />
                    </div>
                  </ServiceDateTwo>
                  <MyRevenues>
                    {revenues.map((v, i) => (
                        <SimpleRevenue key={v.id} data={v} setSelected={addSelected} />
                    
                    ))}
                  </MyRevenues>
                  <RevenuesButtons>
                    <RevenuesButtonsButton $ican={selecteds.length > 0} onClick={setRevenuesUser}>
                      Adicionar planejamento
                    </RevenuesButtonsButton>
                  </RevenuesButtons>
                </ContainerRevenues>
                <RigthBar onClick={() => setType("chat")}>
                  <MySvg src="icons/arrow-right.svg" />
                </RigthBar>
              </>
            )}
          </>
        )}
      </CenterService>
    </Service>
  );
}
