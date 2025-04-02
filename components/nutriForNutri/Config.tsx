import { useEffect, useState } from "react";
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
import { createHours, deleteHours, getHours, updateHours } from "@/service/requests/Hours";

export type Consult = { id: number; init: number; final: number; state: boolean; hourInit: string; hourFinal: string };

export function ConfigComponent() {
  const [data, setData] = useState<Consult[]>([
    {
      id: 1,
      init: 5,
      final: 6,
      hourInit: "06:00",
      hourFinal: "05:00",
      state: false,
    },
  ]);
  const [dataDrag, setDataDrag] = useState<Consult>();
  const [editHours, setEditHours] = useState<boolean>(false);
  const [acceptAuto, setAcceptAuto] = useState<boolean>(false);
  const [acceptClients, setAcceptClients] = useState<boolean>(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  async function getData() {
    const r = await getHours(date);

    if (!r.success) {
      showAlert(r.data?.message ?? "", "error");
      return;
    }

    if (r.data?.hours) {
      const newData: Consult[] = [];

      r.data.hours.forEach((v) => {
        console.log(v.service_final);
        const newInit = `${new Date(v.service_init).getHours().toString().padStart(2, "0")}:${new Date(v.service_init).getMinutes().toString().padStart(2, "0")}`;
        const newFinal = `${new Date(v.service_final).getHours().toString().padStart(2, "0")}:${new Date(v.service_final).getMinutes().toString().padStart(2, "0")}`;

        newData.push({
          id: v.id,
          hourFinal: newFinal,
          hourInit: newInit,
          final: Number(newFinal.slice(0, 2)),
          init: Number(newInit.slice(0, 2)),
          state: v.void,
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

  useEffect(() => {
    getData();
  }, [date]);

  useEffect(() => {
    getData();
  }, []);

  function updateDataObj(newData: Consult) {
    const old = data.filter((e) => e.id != newData.id);
    old.push(newData);
    setData(old);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (dataDrag) {
      const oldD = data.find((v) => v.id == dataDrag.id);

      const left = e.currentTarget.getBoundingClientRect().x;
      const x = e.clientX;

      const widthPerFr = e.currentTarget.clientWidth / 24;

      const diff = x - left;

      if (oldD) {
        const diffData = oldD.final - oldD.init;
        oldD.init = Math.floor(diff / widthPerFr);
        oldD.final = Math.floor(diff / widthPerFr) + diffData;
      }
      updateDataObj(dataDrag);
    }
  };

  async function update(id: number, init: string, final: string) {
    const myData = data.find((e) => e.id == id);

    if (myData) {
      const icanUpdate = await updateData(myData);
      if (icanUpdate) {
        myData.hourFinal = final;
        myData.hourInit = init;
        myData.init = Number(init.slice(0, 2));
        myData.final = Number(final.slice(0, 2));
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

  async function create(id: number, init: string, final: string) {
    let newData: Consult = {
      id: 1,
      init: Number(init.slice(0, 2)),
      final: Number(final.slice(0, 2)),
      hourInit: init,
      hourFinal: final,
      state: true,
    };

    newData = await addData(newData);

    const old = data.filter((e) => e.id != 0);
    old.push(newData);
    setData(old);
  }

  return (
    <ConfigContainer>
      <ConfigHeader>
        <ConfigMarker onClick={() => setAcceptAuto((o) => !o)}>
          <p>Aceitar automaticamente: </p>
          <ConfigMarkeritem $selected={acceptAuto}>Sim</ConfigMarkeritem>
          <ConfigMarkeritem $selected={!acceptAuto}>Não</ConfigMarkeritem>
        </ConfigMarker>
        <ConfigMarker onClick={() => setAcceptClients((o) => !o)}>
          <p>Aceitando clientes: </p>
          <ConfigMarkeritem $selected={acceptClients}>Sim</ConfigMarkeritem>
          <ConfigMarkeritem $selected={!acceptClients}>Não</ConfigMarkeritem>
        </ConfigMarker>
      </ConfigHeader>
      <ConfigDate>
        <ConfigDatePicker>
          <p>Data: </p>
          <input type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
        </ConfigDatePicker>
        <ConfigDatePickerToModal
          onClick={() => {
            showAlert("Modo de edição de horarios habilitado", "info");
            setEditHours((e) => !e);
          }}
        >
          <p>{editHours ? "Editar horarios" : "Salvar edição"}</p>
        </ConfigDatePickerToModal>
        {editHours ? (
          <></>
        ) : (
          <ConfigDatePickerToModal
            style={{ marginLeft: "1vw" }}
            onClick={() => {
              openModal(<HoursComponent hourFinal={"00:00"} hourInit={"00:00"} id={0} create={create} />);
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
            onDragEnd={() => setDataDrag(undefined)}
            onDoubleClick={() => {
              if (!editHours) {
                openModal(<HoursComponent hourFinal={item.hourFinal} hourInit={item.hourInit} id={item.id} deleteItem={deleteItem} update={update} />);
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
