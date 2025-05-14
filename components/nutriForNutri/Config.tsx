import { ChangeEvent, useEffect, useState } from "react";
import { showAlert } from "../alert/page";
import { openModal } from "../MyCustomModal/page";
import HoursComponent from "../NutriConfigComponents/hours";
import {
  ConfigContainer,
  ConfigDate,
  ConfigDatePicker,
  ConfigDatePickerToModal,
  ConfigHeader,
  ConfigHour,
  ConfigHours,
  ConfigMarker,
  ConfigMarkeritem,
  DeleteItem,
} from "./styled";
import MySvg from "../MySvg/page";
import { createHours, deleteHours, getConfigNutri, getHours, updateConfigNutri, updateHours } from "@/service/requests/Hours";

export type Consult = { id: number; init: number; final: number; state: boolean; hourInit: string; hourFinal: string; price: number };

export function ConfigComponent() {
  const [data, setData] = useState<Consult[]>([]);
  const [dataDrag, setDataDrag] = useState<Consult>();
  const [editHours, setEditHours] = useState<boolean>(false);
  const [acceptAuto, setAcceptAuto] = useState<boolean>(false);
  const [acceptClients, setAcceptClients] = useState<boolean>(false);
  const [myPrice, setMyPrice] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeMoney, setTimeMoney] = useState<NodeJS.Timeout>();

  async function getData() {
    const r = await getHours(date);

    if (!r.success) {
      showAlert(r.data?.message ?? "", "error");
      return;
    }

    if (r.data?.hours) {
      const newData: Consult[] = [];

      r.data.hours.forEach((v) => {
        console.log(v);
        const newInit = `${new Date(v.service_init).getHours().toString().padStart(2, "0")}:${new Date(v.service_init).getMinutes().toString().padStart(2, "0")}`;
        const newFinal = `${new Date(v.service_final).getHours().toString().padStart(2, "0")}:${new Date(v.service_final).getMinutes().toString().padStart(2, "0")}`;

        newData.push({
          id: v.id,
          hourFinal: newFinal,
          hourInit: newInit,
          final: Number(newFinal.slice(0, 2)),
          init: Number(newInit.slice(0, 2)),
          state: v.void,
          price: v.price,
        });
      });

      setData(newData);
    }
  }

  async function addData(newData: Consult): Promise<Consult> {
    const r = await createHours({
      service_final: combineDateTime(date, newData.hourFinal).toISOString(),
      service_init: combineDateTime(date, newData.hourInit).toISOString(),
      nutri_id: 0,
      void: false,
      id: 0,
      price: newData.price,
    });

    if (!r.success) {
      showAlert(r.data?.message ?? "", "error");
      return newData;
    }

    if (r.data) {
      if (r.data.id) newData.id = r.data.id;
    }

    return newData;
  }

  async function updateData(newData: Consult): Promise<boolean> {
    const r = await updateHours({
      service_final: combineDateTime(date, newData.hourFinal).toISOString(),
      service_init: combineDateTime(date, newData.hourInit).toISOString(),
      nutri_id: 0,
      void: false,
      id: newData.id,
      price: newData.price,
    });

    if (!r.success) {
      showAlert(r.data?.message ?? "", "error");
      return false;
    }

    return true;
  }

  async function deleteData(id: number) {
    const r = await deleteHours(id);

    showAlert(r.data?.message || "", r.success ? "success" : "error");
    return r.success;
  }

  const combineDateTime = (dateStr: string, timeStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  };

  async function getConfig() {
    const r = await getConfigNutri();

    if (!r.success) {
      showAlert(r.data?.message ?? "Aconteceu um erro, tente atualizar a pagina!", "error");
      return;
    }

    if (r.data) {
      if (r.data.price) setMyPrice(r.data.price);
      if (r.data.acceptClients) setAcceptClients(r.data.acceptClients);
    }
  }

  async function updateConfig(type: "open" | "price", status: boolean, price?: number) {
    if (type == "open") {
      if (acceptClients == status) return;
    }

    const r = await updateConfigNutri(type == "price" ? price : undefined, type == "open" ? status : undefined);

    if (!r.success) {
      showAlert(r.data?.message ?? "Aconteceu um erro, tente atualizar a pagina!", "error");
      return;
    } else {
      showAlert(r.data?.message ?? "Configurações atualizado!", "success");
    }

    if (type == "open") {
      setAcceptClients(status);
    } else {
      setMyPrice(price ?? myPrice);
    }
  }

  //TODO melhorar sistema de float
  function parseMoneyInput(value: string | number): number {
    let num = 0;

    if (typeof value === "string") {
      const normalized = value
        .trim()
        .replace(",", ".")
        .replace(/[^0-9.]/g, "");
      num = parseFloat(normalized);
    } else {
      num = value;
    }

    if (isNaN(num)) return 0;

    // Garante que o número tenha duas casas decimais
    return parseFloat(num.toFixed(2));
  }

  async function updateValue(event: ChangeEvent<HTMLInputElement>) {
    const price = Number(event.currentTarget.value);
    console.log(event.currentTarget.value);

    try {
      clearInterval(timeMoney);
    } catch (error) {}

    if (!Number.isNaN(price)) {
      console.log(parseMoneyInput(price));
      setMyPrice(parseMoneyInput(price));

      setTimeMoney(
        setTimeout(() => {
          updateConfig("price", false, price);
        }, 500)
      );
    }
  }

  useEffect(() => {
    getData();
    getConfig();
  }, [date]);

  useEffect(() => {
    getData();
  }, []);

  function updateDataObj(newData: Consult) {
    const old = data.filter((e) => e.id != newData.id);
    old.push(newData);
    setData(old);
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (dataDrag) {
      const oldD = data.find((v) => v.id == dataDrag.id);

      const left = e.currentTarget.getBoundingClientRect().x;
      const x = e.clientX;

      const widthPerFr = e.currentTarget.clientWidth / 24;

      const diff = x - left;

      if (oldD) {
        const diffData = oldD.final - oldD.init;

        const updated = await updateData({
          final: Math.floor(diff / widthPerFr) + diffData,
          init: Math.floor(diff / widthPerFr),
          id: oldD.id,
          state: oldD.state,
          hourFinal: `${(Math.floor(diff / widthPerFr) + diffData).toString().padStart(2, "0")}:${oldD.hourInit.slice(3)}`,
          hourInit: `${Math.floor(diff / widthPerFr)
            .toString()
            .padStart(2, "0")}:${oldD.hourInit.slice(3)}`,
          price: oldD.price,
        });

        if (updated) {
          oldD.init = Math.floor(diff / widthPerFr);
          oldD.hourInit = `${Math.floor(diff / widthPerFr)
            .toString()
            .padStart(2, "0")}:${oldD.hourInit.slice(3)}`;
          oldD.final = Math.floor(diff / widthPerFr) + diffData;
          oldD.hourFinal = `${(Math.floor(diff / widthPerFr) + diffData).toString().padStart(2, "0")}:${oldD.hourInit.slice(3)}`;
          updateDataObj(dataDrag);
        }
      }
    }
  };

  async function update(id: number, init: string, final: string) {
    const myData = data.find((e) => e.id == id);
    if (myData) {
      myData.hourFinal = final;
      myData.hourInit = init;
      myData.init = Number(init.slice(0, 2));
      myData.final = Number(final.slice(0, 2));
      const icanUpdate = await updateData(myData);
      if (icanUpdate) {
        const old = data.filter((e) => e.id != myData.id);
        old.push(myData);
        setData(old);
      }
    }
  }

  async function deleteItem(id: number) {
    const dataDelete = data.find((v) => v.id == id);

    if (dataDelete) {
      const icanDelete = await deleteData(dataDelete.id);

      if (icanDelete) {
        const old = data.filter((e) => e.id != dataDelete.id);
        setData(old);
        setDataDrag(undefined);
      }
    }
  }

  async function removeFormList() {
    if (dataDrag) {
      const dataDelete = data.find((v) => v.id == dataDrag.id);
      if (dataDelete) {
        const icanDelete = await deleteData(dataDelete.id);

        if (icanDelete) {
          const old = data.filter((e) => e.id != dataDelete.id);
          setData(old);
          setDataDrag(undefined);
        }
      }
    }
  }

  async function create(id: number, init: string, final: string, price: number) {
    let newData: Consult = {
      id: 1,
      init: Number(init.slice(0, 2)),
      final: Number(final.slice(0, 2)),
      hourInit: init,
      hourFinal: final,
      state: true,
      price: price,
    };

    newData = await addData(newData);

    const old = data.filter((e) => e.id != 0);
    old.push(newData);
    setData(old);
  }

  return (
    <ConfigContainer>
      <ConfigHeader>
        <ConfigMarker>
          <p>Valor da hora: </p>
          <input
            type="number"
            value={myPrice}
            onChange={(e) => {
              updateValue(e);
            }}
          />
        </ConfigMarker>
        <ConfigMarker>
          <p>Aceitando clientes: </p>
          <ConfigMarkeritem $selected={acceptClients} onClick={() => updateConfig("open", true)}>
            Sim
          </ConfigMarkeritem>
          <ConfigMarkeritem $selected={!acceptClients} onClick={() => updateConfig("open", false)}>
            Não
          </ConfigMarkeritem>
        </ConfigMarker>
      </ConfigHeader>
      <ConfigDate>
        <ConfigDatePicker>
          <p>Data: </p>
          <input type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
        </ConfigDatePicker>
        {editHours ? (
          <></>
        ) : (
          <ConfigDatePickerToModal
            onClick={() => {
              openModal(<HoursComponent hourFinal={"00:00"} hourInit={"00:00"} id={0} price={myPrice} create={create} />);
            }}
          >
            <p>Criar novo horario</p>
          </ConfigDatePickerToModal>
        )}
      </ConfigDate>
      <ConfigHours onDrop={(e) => handleDrop(e)} onDragOver={(e) => e.preventDefault()}>
        {data.map((item, index) => (
          <ConfigHour
            draggable={!editHours ? true : false}
            key={"hour" + index}
            onDragStart={() => setDataDrag(item)}
            onDragEnd={() => {
              setDataDrag(undefined);
            }}
            onDoubleClick={() => {
              if (!editHours) {
                openModal(
                  <HoursComponent hourFinal={item.hourInit} hourInit={item.hourFinal} id={item.id} deleteItem={deleteItem} update={update} price={item.price} />
                );
              }
            }}
            $init={item.init}
            $final={item.final}
            $status={item.state ? "open" : "closed"}
          >
            {!item.state ? "Marcado" : "Disponivel"}
          </ConfigHour>
        ))}
        {Array.from({ length: 24 }, (_, index) => {
          const hours = String(index).padStart(2, "0"); // Garante que a hora tenha 2 dígitos
          return <label key={index}>{hours}:00</label>;
        })}
      </ConfigHours>
      {dataDrag ? (
        <DeleteItem onDragOver={(e) => e.preventDefault()} onDrop={() => removeFormList()}>
          <MySvg src="icons/trash.svg"></MySvg>
        </DeleteItem>
      ) : (
        <></>
      )}
    </ConfigContainer>
  );
}
