import { useEffect, useRef, useState } from "react";
import {
  PlanButton,
  PlanButtonDiv,
  PlanItem,
  PlanItemContainer,
  PlanItemDescription,
  PlanItemImg,
  PlanItemRecipe,
  PlanItemRecipeTextArea,
  PlanItemTitle,
  PlanItemTitleDiv,
  PlanItemTitleInput,
  PlanItemTitleInputDate,
} from "../planComponent/styled";
import { showAlert } from "../alert/page";
import { allowedTypes } from "../ComponentPost/page";
import { deleteAPI, insertPlanAPI, markedAPI, planFood, updateAPI } from "@/service/requests/Plan";

export default function PlanItemComponent(prop: {
  plan: planFood;
  new: boolean;
  date: string;
  isMyProfile: boolean;
  addNew: (plan: planFood) => void;
  cancelNew: () => void;
  update: (plan: planFood) => void;
  deletePlan: (id: number) => void;
  type?: number;
}) {
  const [marked, setMarked] = useState(prop.plan.marked);
  const [showRecipe, setShowRecipe] = useState(false);
  const [newName, setNewName] = useState("");
  const [picture, setPicture] = useState("");
  const [dateInit, setDateInit] = useState("00:00");
  const [dateFinal, setDateFinal] = useState("00:00");
  const [nameType, setNameType] = useState("");
  const [recipe, setRecipe] = useState("");
  const [kcal, setKcal] = useState("");

  const inputFile = useRef<HTMLInputElement>(null);
  const [isNew, setIsNew] = useState(prop.new);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [loadMarked, setLoadMarked] = useState(false);

  function formatHourMinute(date: Date): string {
    try {
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (e) {
      const newD = new Date(date);
      const hours = newD.getUTCHours().toString().padStart(2, "0");
      const minutes = newD.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  }
  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      showAlert("Apenas arquivos JPEG, JPG, PNG ou GIF são permitidos.", "warning");
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && validateFile(file)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setPicture(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Retorna true se a data for válida
  };

  function convetForGMT(dateStr: string): Date {
    const date = new Date(dateStr);
    date.setHours(date.getHours() - 3);
    return date;
  }

  async function createPlan() {
    if (!isValidDate(`${prop.date}T${dateInit}:00`)) showAlert("Horario inicial (de) coloque digite validos.", "warning");
    if (!isValidDate(`${prop.date}T${dateFinal}:00`)) showAlert("Horario final (Até) coloque digite validos.", "warning");
    const initDate = convetForGMT(`${prop.date}T${dateInit}:00`);
    const finalDate = convetForGMT(`${prop.date}T${dateFinal}:00`);

    if (newName.length < 5) showAlert("O nome do prato tem que ter mais que 5 caracteres.", "warning");

    const data: planFood = {
      id: 0,
      dateFinal: finalDate,
      dateInit: initDate,
      picture: picture,
      marked: false,
      name: newName,
      nameType: nameType,
      recipe: recipe,
      kcal: kcal,
    };

    const r = await insertPlanAPI(data);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    }

    if (r.data) {
      if (r.data.idPlan) {
        data.id = r.data.idPlan;
        prop.addNew(data);
      }
    }
  }

  async function saveEdit() {
    const initDate = `${prop.date}T${dateInit}:00`;
    const finalDate = `${prop.date}T${dateFinal}:00`;
    if (!isValidDate(initDate)) showAlert("Horario inicial (de) coloque digite validos.", "warning");
    if (!isValidDate(finalDate)) showAlert("Horario final (Até) coloque digite validos.", "warning");
    if (newName.length < 5) showAlert("O nome do prato tem que ter mais que 5 caracteres.", "warning");

    const data: planFood = {
      id: id,
      dateFinal: new Date(finalDate),
      dateInit: new Date(initDate),
      picture: picture,
      marked: false,
      name: newName,
      nameType: nameType,
      recipe: recipe,
      kcal: kcal,
    };

    const r = await updateAPI(data);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    }

    prop.update(data);
    setIsEdit(false);
    setIsNew(false);
  }

  function edit() {
    setId(prop.plan.id);
    setNewName(prop.plan.name);
    setPicture(prop.plan.picture);
    setDateFinal(formatHourMinute(prop.plan.dateFinal));
    setDateInit(formatHourMinute(prop.plan.dateInit));
    setNameType(prop.plan.nameType);
    setRecipe(prop.plan.recipe);
    setNewName(prop.plan.name);
    setIsEdit(true);
    setIsNew(true);
  }

  async function deleteThis() {
    const r = await deleteAPI(prop.plan.id);

    if (!r.success) {
      showAlert(r.data?.message || "", "error");
      return;
    } else {
      showAlert(r.data?.message || "", "success");
      prop.deletePlan(prop.plan.id);
    }
  }

  async function sendMarked() {
    await markedAPI(prop.plan.id, marked);
    setLoadMarked(false);
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    let value = event.target.value;

    // Remover caracteres não numéricos, para permitir apenas números e ":"
    value = value.replace(/[^0-9:]/g, "");

    // Garantir que o formato seja HH:MM (com 2 dígitos para hora e minuto)
    if (value.length > 5) {
      value = value.slice(0, 5); // Limitar para 5 caracteres (HH:MM)
    }

    // Adicionar ":" após os dois primeiros dígitos, se necessário
    if (value.length === 2 && !value.includes(":")) {
      value = value + ":"; // Adicionar ":" após as duas primeiras posições
    }

    // Verificar se os minutos são válidos (não podem ser maiores que 59)
    if (value.length === 5) {
      const [hours, minutes] = value.split(":");

      // Limitar os minutos a 59
      if (parseInt(minutes) > 59) {
        value = `${hours}:59`; // Se os minutos forem maiores que 59, coloca 59
      }
    }

    setter(value); // Atualiza o estado com o valor formatado
  };

  return (
    <PlanItemContainer>
      <PlanItem
        $marked={marked}
        onClick={(e) => {
          if (!loadMarked) {
            if (e.target instanceof HTMLButtonElement || isNew) {
            } else {
              if (!prop.isMyProfile) return;

              setLoadMarked(true);
              if (!marked) showAlert("Marcação feita: refeição realizada", "info");
              if (marked) showAlert("Marcação feita: refeição não realizada", "info");
              setMarked((o) => !o);

              sendMarked();
            }
          } else {
            showAlert("Aguarde o carregamento acabar", "info");
          }
        }}
      >
        {isNew ? (
          <span style={{ display: "flex", width: "100%", alignItems: "center", flexWrap: "wrap" }}>
            <PlanItemImg
              style={{ height: picture == "" ? "70%" : "" }}
              src={picture != "" ? picture : "/icons/image.svg"}
              onClick={() => inputFile.current?.click()}
            />
            {picture == "" ? <p style={{ width: "100%", textAlign: "center" }}>Clique na foto para adicionar</p> : <></>}
          </span>
        ) : (
          <PlanItemImg src={prop.plan.picture != "" ? prop.plan.picture : "/png/logo.jpeg"} />
        )}
        {isNew ? (
          <PlanItemTitleInput placeholder="Nome do prato" value={newName} onChange={(e) => setNewName(e.currentTarget.value)} />
        ) : (
          <PlanItemTitle>{prop.plan.name}</PlanItemTitle>
        )}
        {isNew ? (
          <PlanItemTitleInput placeholder="Refeição" value={nameType} onChange={(e) => setNameType(e.currentTarget.value)} />
        ) : (
          <PlanItemDescription>Refeição: {prop.plan.nameType}</PlanItemDescription>
        )}
        {isNew ? (
          <PlanItemTitleDiv>
            <PlanItemTitleInputDate
              type="text"
              placeholder="De (Hora)"
              value={dateInit}
              onChange={(e) => handleTimeChange(e, setDateInit)} // Chama a função para formatação
            />
            <PlanItemTitleInputDate
              type="text"
              placeholder="Até (Hora)"
              value={dateFinal}
              onChange={(e) => handleTimeChange(e, setDateFinal)} // Chama a função para formatação
            />
          </PlanItemTitleDiv>
        ) : (
          <PlanItemDescription>
            Horario: {formatHourMinute(prop.plan.dateInit)} - {formatHourMinute(prop.plan.dateFinal)}
          </PlanItemDescription>
        )}

        {!isNew ? (
          <PlanItemDescription>Calorias: {prop.plan.kcal} kcal</PlanItemDescription>
        ) : (
          <PlanItemTitleInput type="number" placeholder="Calorias" value={kcal} onChange={(e) => setKcal(e.currentTarget.value)} />
        )}

        <PlanButton
          onClick={() => {
            setShowRecipe((o) => !o);
          }}
        >
          {!showRecipe ? "Mostrar Receita" : "Esconder receita"}
        </PlanButton>
        {prop.isMyProfile ? (
          <>
            {isNew ? (
              <PlanButtonDiv>
                {isEdit ? (
                  <>
                    <PlanButton style={{ background: "red " }} onClick={prop.cancelNew}>
                      Cancelar
                    </PlanButton>
                    <PlanButton onClick={saveEdit}>Salvar</PlanButton>
                  </>
                ) : (
                  <>
                    <PlanButton style={{ background: "red " }} onClick={prop.cancelNew}>
                      Cancelar
                    </PlanButton>
                    <PlanButton onClick={createPlan}>Salvar</PlanButton>
                  </>
                )}
              </PlanButtonDiv>
            ) : (
              <PlanButtonDiv>
                <PlanButton style={{ background: "red " }} onClick={deleteThis}>
                  Deletar
                </PlanButton>
                <PlanButton onClick={edit}>Editar</PlanButton>
              </PlanButtonDiv>
            )}{" "}
          </>
        ) : (
          <></>
        )}
      </PlanItem>
      {isNew ? (
        <PlanItemRecipeTextArea
          placeholder="Adicione uma receita."
          $showRecipe={showRecipe}
          value={recipe}
          onChange={(e) => setRecipe(e.currentTarget.value)}
        />
      ) : (
        <PlanItemRecipe $showRecipe={showRecipe}>{prop.plan.recipe}</PlanItemRecipe>
      )}
      {isNew ? (
        <input type="file" ref={inputFile} alt="Imagem da receita" onChange={handleFileChange} style={{ position: "absolute", display: "none" }} />
      ) : (
        <></>
      )}
    </PlanItemContainer>
  );
}
