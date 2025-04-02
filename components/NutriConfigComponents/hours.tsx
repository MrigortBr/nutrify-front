import styled from "styled-components";
import { ChatHeader, ChatClose, ChatTitle } from "../modalChat/styled";
import { openModal } from "../MyCustomModal/page";
import { Consult } from "../nutriForNutri/Config";
import { useState } from "react";

const HourContainer = styled.div`
  width: 50vw;
  margin: auto;
  height: 30vh;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;

  & > button {
    width: 30%;
    height: fit-content;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
    border: 0;
    padding: 1%;
    border-radius: 15px;
    font-size: calc(var(--px) * 22);
    margin: auto;
    cursor: pointer;
    transition: 500ms;
  }

  & > .delete:hover {
    background-color: red;
  }

  & > button:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
  }
`;

const HoursAdd = styled.div`
  color: black;
  font-size: calc(var(--px) * 26);
  height: fit-content;
  width: 90%;
  margin: auto;
  display: flex;

  gap: 5px;

  & > input {
    color: black;
    text-align: center;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid black;
    width: fit-content;
  }

  & > input:focus {
    outline: 0;
  }
`;

const HourHeader = styled.div`
  height: 10vh;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.contrastText};
  display: flex;
`;

const HourClose = styled.img`
  height: 100%;
  transition: 300ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const HourTitle = styled.h1`
  height: 100%;
  width: 50%;
  margin-left: 20%;
  text-align: center;
`;

export default function HoursComponent(prop: {
  hourInit: string;
  hourFinal: string;
  id: number;
  deleteItem?: (id: number) => void;
  update?: (id: number, init: string, final: string) => void;
  create?: (id: number, init: string, final: string) => void;
}) {
  const [init, setInit] = useState(prop.hourFinal);
  const [final, setFinal] = useState(prop.hourInit);

  return (
    <HourContainer>
      <HourHeader>
        <HourClose src="/icons/close.svg" onClick={() => openModal(<></>)} />
        <HourTitle>Configurações</HourTitle>
      </HourHeader>
      <HoursAdd>
        Adicionar novo horario:
        <input type="time" value={init} onChange={(e) => setInit(e.target.value)} placeholder="de" />-
        <input type="time" value={final} onChange={(e) => setFinal(e.target.value)} placeholder="até" />
      </HoursAdd>

      {prop.id == 0 ? (
        <button
          onClick={() => {
            if (prop.create) {
              prop.create(prop.id, init, final);
              openModal(<></>);
            }
          }}
        >
          Criar
        </button>
      ) : (
        <>
          <button
            className="delete"
            onClick={() => {
              if (prop.deleteItem) {
                prop.deleteItem(prop.id);
                openModal(<></>);
              }
            }}
          >
            Deletar
          </button>
          <button
            onClick={() => {
              if (prop.update) {
                prop.update(prop.id, init, final);
                openModal(<></>);
              }
            }}
          >
            Atualizar
          </button>
        </>
      )}
    </HourContainer>
  );
}
