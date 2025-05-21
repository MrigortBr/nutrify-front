import { ChangeEvent, use, useEffect, useRef, useState } from "react";
import {
  EditDiv,
  ImageAddInput,
  Revenue,
  RevenueBody,
  RevenueImageSpan,
  RevenueImg,
  RevenueInfo,
  RevenueInfoTextArea,
  ShowRevenue,
} from "../nutriForNutri/styled";
import { Revenue as RevenueType } from "../../service/requests/revenue";
import { showAlert } from "../alert/page";

type Props = {
  data: RevenueType;
  new: boolean;
  finish?: (newData: RevenueType) => void;
  create?: (newData: RevenueType) => void;
  cancel?: () => void;
  remove?: (id: number) => void;
  noButtons?: boolean;
};

export default function RevenueComponent(props: Props) {
  const [showRevenueInfo, setshowRevenueInfo] = useState<boolean>(false);
  const [newRevenue, setNewRevenue] = useState<boolean>(props.new);
  const [picture, setPicture] = useState<string>(props.data.picture);
  const [name, setName] = useState<string>(props.data.name);
  const [typeRevenue, setTypeRevenue] = useState<string>(props.data.nameType);
  const [initHour, setinitHour] = useState<string>(props.data.dateInit);
  const [finalHour, setFinalHour] = useState<string>(props.data.dateFinal);
  const [kcal, setKcal] = useState<number>(props.data.kcal);
  const [recipe, setRecipe] = useState<string>(props.data.recipe);
  const [oldData, setOldData] = useState<RevenueType>(props.data);
  const inputHtml = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    if (!picture || !/^data:image\/(jpeg|jpg|png);base64,/.test(picture)) {
      showAlert("A imagem deve ser um arquivo JPEG, JPG ou PNG.", "info");
      return false;
    }

    if (!name.trim()) {
      showAlert("O nome da receita não pode estar vazio.", "info");
      return false;
    }

    if (!typeRevenue.trim()) {
      showAlert("O tipo da receita não pode estar vazio.", "info");
      return false;
    }

    if (!initHour.trim()) {
      showAlert("O horário de início deve ser informado.", "info");
      return false;
    }

    if (!finalHour.trim()) {
      showAlert("O horário de término deve ser informado.", "info");
      return false;
    }

    if (isNaN(kcal) || kcal <= 0) {
      showAlert("As calorias devem ser um número positivo.", "info");
      return false;
    }

    if (!recipe.trim()) {
      showAlert("A receita não pode estar vazia.", "info");
      return false;
    }

    return true; // Tudo válido!
  };

  function cancel() {
    setPicture(oldData.picture);
    setName(oldData.name);
    setTypeRevenue(oldData.nameType);
    setinitHour(oldData.dateInit);
    setFinalHour(oldData.dateFinal);
    setKcal(oldData.kcal);
    setRecipe(oldData.recipe);
    setNewRevenue(false);

    if (oldData.id == 0) {
      if (props.cancel) props.cancel();
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Formato inválido! Apenas JPEG, JPG e PNG são permitidos.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        if (typeof reader.result == "string") setPicture(reader.result);
      }
    };
  };

  function finishOrCreate() {
    if (!validateForm()) {
      return;
    }

    if (oldData.id == 0) {
      const newData: RevenueType = { id: 15, picture, name, nameType: typeRevenue, dateInit: initHour, dateFinal: finalHour, kcal, recipe };
      if (props.create) props.create(newData);
      setNewRevenue(false);
    } else {
      const newData: RevenueType = { id: oldData.id, picture, name, nameType: typeRevenue, dateInit: initHour, dateFinal: finalHour, kcal, recipe };
      if (props.finish) props.finish(newData);
      setOldData(newData);
      setNewRevenue(false);
    }
  }

  function remove() {
    if (!validateForm()) {
      return;
    }

    if (props.remove) props.remove(oldData.id);
  }

  return (
    <>
      {!newRevenue ? (
        <Revenue $showRecipe={showRevenueInfo}>
          <RevenueInfo $showRecipe={showRevenueInfo}>
            {props.data.recipe}
          </RevenueInfo>
          <RevenueBody>
            <RevenueImageSpan>
              <RevenueImg style={{ height: "100%" }} src={picture.trim() === "" ? "/icons/image.svg" : picture} />
            </RevenueImageSpan>
            <h1>{name}</h1>
            <h2>Refeição: {typeRevenue}</h2>
            <h3>
              Horario: {new Date(initHour).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
              {new Date(finalHour).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </h3>
            <h4>Kcal: {kcal}</h4>

            {props.noButtons == false || props.noButtons == undefined ? (
              <>
                <ShowRevenue $hover={showRevenueInfo} onClick={() => setshowRevenueInfo((e) => !e)}>
                  {!showRevenueInfo ? "Mostrar receita" : "Ocultar receita"}
                </ShowRevenue>
                <EditDiv>
                  <ShowRevenue $negative={true} onClick={remove}>
                    Deletar
                  </ShowRevenue>
                  <ShowRevenue onClick={() => setNewRevenue(true)}>Editar</ShowRevenue>
                </EditDiv>
              </>
            ) : (
              <></>
            )}
          </RevenueBody>
        </Revenue>
      ) : (
        <Revenue $showRecipe={showRevenueInfo}>
          <RevenueInfoTextArea
            placeholder="Escreva a receita do prato"
            $showRecipe={showRevenueInfo}
            value={recipe}
            onChange={(el: ChangeEvent<HTMLTextAreaElement>) => setRecipe(el.currentTarget.value)}
          ></RevenueInfoTextArea>
          <RevenueBody>
            <RevenueImageSpan onClick={() => inputHtml.current?.click()}>
              <RevenueImg src={picture.trim() === "" ? "/icons/image.svg" : picture} />
              <p>Clique na foto para adicionar</p>
            </RevenueImageSpan>
            <h1>
              <input type="text" placeholder="Nome do prato" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            </h1>
            <h2>
              Refeição:
              <input placeholder="Tipo da refeição" type="text" value={typeRevenue} onChange={(e) => setTypeRevenue(e.currentTarget.value)} />
            </h2>
            <h3>
              Horario:
              <input type="time" value={initHour} placeholder="22:00" onChange={(e) => setinitHour(e.currentTarget.value)} />-{" "}
              <input type="time" value={finalHour} onChange={(e) => setFinalHour(e.currentTarget.value)} />
            </h3>
            <h4>
              Kcal:
              <input type="number" placeholder="Calorias do prato" value={kcal} onChange={(e) => setKcal(Number(e.currentTarget.value))} />
            </h4>
            <ShowRevenue $hover={showRevenueInfo} onClick={() => setshowRevenueInfo((e) => !e)}>
              {!showRevenueInfo ? "Mostrar receita" : "Ocultar receita"}
            </ShowRevenue>
            <EditDiv>
              <ShowRevenue $negative={true} onClick={cancel}>
                Cancelar
              </ShowRevenue>
              <ShowRevenue onClick={finishOrCreate}>Finalizar</ShowRevenue>
            </EditDiv>
          </RevenueBody>
          <ImageAddInput ref={inputHtml} type="file" onChange={handleImageChange} accept={".jpeg, .jpg, .png"} />
        </Revenue>
      )}
    </>
  );
}
