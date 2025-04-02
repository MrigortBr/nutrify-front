import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ChatDigit,
  ChatImg,
  ChatInputs,
  ChatMessages,
  ChatMessagesClose,
  ChatMessagesContainer,
  ChatMessagesFinish,
  ChatMessagesHeader,
  ChatMessagesImg,
  ChatMessagesName,
  FinishedContainer,
  MessageRecived,
  MessageSended,
  TextareaContainer,
} from "./styled";
import { dataHistory } from "@/service/socket/types";
import MySvg from "../MySvg/page";
import { socket } from "../menu/page";
import { Rating } from "@mui/material";

type Props = {
  nutriId: string;
  picture: string;
  name: string;
  username?: string;
  full?: boolean;
  id: number;
  type: "nutri" | "user";
  finished: boolean;
  close: number;
};

export default function ChatNutriComponent(props: Props) {
  const [name, setName] = useState(props.name);
  const [username, setUsername] = useState(props.username ?? "");
  const [picture, setPicture] = useState(props.picture);
  const [nutriId, setNutriId] = useState(props.nutriId);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [history, setHistory] = useState<dataHistory[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [digit, setDigit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [changeInput, setChangeInput] = useState<NodeJS.Timeout>();
  const [finished, setFinished] = useState<boolean>(props.finished);

  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    getUserOnline();
    console.log(props.close);
    console.log(finished && props.type == "user" && props.close == 6);
  }, []);

  useEffect(() => {
    if (username) {
      listenType();
      listenChat();
      getHistory();
    }
  }, [username]);

  function listenType() {
    socket.on(`${socket.id}${username}`, (data: { change: boolean }) => {
      setDigit(data.change);
    });
  }

  function onChangeTextArea(el: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(el.currentTarget.value);
  }

  function getUserOnlineByUsername(Tempusername: string) {
    socket.on(`${Tempusername}Online`, (data: boolean) => {
      setIsOnline(data);
    });
  }

  function getUserOnline() {
    if (username) {
      getUserOnlineByUsername(username);
      socket.emit("userIsOnline", { username });
    } else {
      socket.on(`${nutriId}OnlineNutri`, (data: { online: boolean; username: string }) => {
        setIsOnline(data.online);
        setUsername(data.username);
        socket.off(`${nutriId}OnlineNutri`);
        getUserOnlineByUsername(data.username);
      });
      socket.emit("userIsOnlineNutri", { nutriId });
    }
  }

  function onKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      socket.emit(`OnChangeText`, { change: false, username: username });
      SendMessage();
      setMessage("");
    } else if (event.key === "Backspace") {
      console.log(chatContainerRef.current);
    } else {
      socket.emit(`OnChangeText`, { change: true, username: username });
      if (changeInput) clearTimeout(changeInput);
      const timeout = setTimeout(() => {
        socket.emit(`OnChangeText`, { change: false, username: username });
      }, 2000);

      setChangeInput(timeout);
    }
  }

  function addMessage(data: dataHistory) {
    setHistory((e) => [...e, data]);
  }

  function SendMessage() {
    socket.on(`${socket.id}${username}sendedMessageNutri`, (data: dataHistory[]) => {
      //console.log(data);
      data.forEach((v) => {
        addMessage(v);
      });
      socket.off(`${socket.id}${username}sendedMessageNutri`);
    });
    socket.emit("sendMessageNutri", { username, message });
  }

  function listenChat() {
    console.log("OPa");
    socket.on(`${socket.id}${username}recivedMessageNutri`, (data: dataHistory[]) => {
      data.forEach((v) => {
        v.mymessage = false;
        addMessage(v);
      });
    });
  }

  function finishService() {
    socket.emit(`finishNutri`, { finishService: true, rating: rating, description: description, nutrId: nutriId, id: props.id });
    setFinished(false);
  }

  function getHistory() {
    socket.on(`${socket.id}${username}getHistoryNutri`, (data: dataHistory[]) => {
      setHistory(data);
      socket.off(`${socket.id}${username}getHistoryNutri`);
    });
    socket.emit("getHistoryNutri", { username });
  }

  return (
    <ChatMessages style={{ width: props.full ? "100%" : "", height: props.full ? "100%" : "" }}>
      {finished && props.type == "user" && props.close == 6 ? (
        <FinishedContainer>
          <span>
            <h1>Avalie sua consulta</h1>
            <p>
              Nota: <Rating value={rating} onChange={(e, v) => setRating(v ?? 0)} precision={0.5}></Rating>
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="se quiser nos conte como foi seu atendimento"
            ></textarea>
            <button onClick={finishService}>Enviar</button>
          </span>
        </FinishedContainer>
      ) : (
        <></>
      )}

      <ChatMessagesHeader>
        <ChatMessagesImg>
          <ChatImg src={picture ?? "/png/remo.jpg"}></ChatImg>
        </ChatMessagesImg>
        <ChatMessagesName>
          <p className="nameUser"> {name}</p>
          <p className="status">{isOnline ? "Online" : "Offline"}</p>
        </ChatMessagesName>
        <ChatMessagesFinish onClick={() => setFinished(true)}>{!finished ? "Finalizar Chat" : "Chat finalizado"}</ChatMessagesFinish>
        <ChatMessagesClose src="/icons/close.svg" style={{ marginLeft: "0" }} />
      </ChatMessagesHeader>
      <ChatMessagesContainer ref={chatContainerRef} key={"chatMessagesConatiner"}>
        {history.map((value, index) =>
          !value.mymessage ? (
            <MessageRecived key={index}>
              <p className="message">{value.message}</p>
              <p className="hour">{new Date(value.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}</p>
            </MessageRecived>
          ) : (
            <MessageSended key={index}>
              <p className="message">{value.message}</p>
              <p className="hour">{new Date(value.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}</p>
            </MessageSended>
          )
        )}
      </ChatMessagesContainer>
      {finished ? (
        <></>
      ) : (
        <ChatInputs>
          <TextareaContainer value={message} onChange={onChangeTextArea} onKeyDown={onKey}></TextareaContainer>
          <button>
            <MySvg src="icons/send.svg"></MySvg>
          </button>
        </ChatInputs>
      )}
      {digit ? (
        <ChatDigit>
          <p className="text">Digitando </p>
          <p className="dot1 dot">.</p>
          <p className="dot2 dot">.</p>
          <p className="dot3 dot">.</p>
        </ChatDigit>
      ) : (
        <></>
      )}
    </ChatMessages>
  );
}
