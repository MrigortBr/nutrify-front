import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ChatDigit,
  ChatFinished,
  ChatImg,
  ChatInputs,
  ChatMessages,
  ChatMessagesClose,
  ChatMessagesContainer,
  ChatMessagesFinish,
  ChatMessagesHeader,
  ChatMessagesImg,
  ChatMessagesName,
  DateDiv,
  FinishedContainer,
  MessageRecived,
  MessageSended,
  TextareaContainer,
} from "./styled";
import { dataHistory } from "@/service/socket/types";
import MySvg from "../MySvg/page";
import { socket } from "../menu/page";
import { Rating } from "@mui/material";
import { showAlert } from "../alert/page";

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
  closeChat: () => void;
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
  const [finishedClosed, setFinishedClosed] = useState<boolean>(props.finished);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [avaliable, setAvaliable] = useState(false);

  useEffect(() => {
    getUserOnline();
    if (finishedClosed) {
      getRating();
    }
  }, []);

  useEffect(() => {
    if (username) {
      listenType();
      listenChat();
      getHistory();
      listenClose();
    }
  }, [username]);

  function listenClose() {
    socket.on(`${props.id}finished`, () => {
      if (props.type == "nutri") {
        setFinishedClosed(true);
        setAvaliable(false);
      } else {
        setFinishedClosed(true);
        setFinished(true);
        setAvaliable(true);
      }
    });
  }

  function getRating() {
    if (rating <= 0 && finishedClosed) {
      const id = props.id;
      socket.emit("getRating", { id });
      socket.on(`${socket.id}reciveRating`, (data: { rating: number; description: string }) => {
        if (data.rating == 6) {
          setAvaliable(true);
        } else {
          setAvaliable(false);
        }
        setRating(data.rating < 6 ? data.rating : 0);
        try {
          setDescription(data.description.length > 0 ? data.description : "Sem comentario.");
        } catch (error) {}
        socket.off(`${socket.id}reciveRating`);
      });
    } else {
      socket.emit("finishByNutri", { finishService: true, nutriId: nutriId, id: props.id, username: username });
      setFinished(true);
      setFinishedClosed(true);
      showAlert("Chat finalizado, aguarde para o usuario avalaiar o atedimento", "success");
    }
  }

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

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  function SendMessage() {
    socket.on(`${socket.id}${username}sendedMessageNutri`, (data: dataHistory[]) => {
      data.forEach((v) => {
        addMessage(v);
      });
      socket.off(`${socket.id}${username}sendedMessageNutri`);
    });
    socket.emit("sendMessageNutri", { username, message });
  }

  function listenChat() {
    socket.on(`${socket.id}${username}recivedMessageNutri`, (data: dataHistory[]) => {
      data.forEach((v) => {
        v.mymessage = false;
        addMessage(v);
      });
    });
  }

  function finishService() {
    socket.emit(`finishNutri`, { finishService: true, rating: rating, description: description, nutriId: nutriId, id: props.id, username: username });
    setFinished(false);
    setFinishedClosed(true);
    setAvaliable(false);
  }

  function getHistory() {
    socket.on(`${socket.id}${username}getHistoryNutri`, (data: dataHistory[]) => {
      setHistory(data);
      socket.off(`${socket.id}${username}getHistoryNutri`);
    });
    socket.emit("getHistoryNutri", { username });
  }

  function renderMessagesWithDates(history: dataHistory[]) {
    const elements: React.ReactNode[] = [];
    const shownDates = new Set<string>();

    history.forEach((item, index) => {
      const dateObj = new Date(item.created_at);
      const dateString = dateObj.toDateString();

      // Renderiza a data apenas uma vez por dia
      if (!shownDates.has(dateString)) {
        shownDates.add(dateString);
        elements.push(<DateDiv key={`date-${dateString}-${index}`}>{dateObj.toLocaleDateString("en-GB")}</DateDiv>);
      }

      const timeString = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const messageComponent = !item.mymessage ? (
        <MessageRecived key={`msg-${index}`}>
          <p className="message">{item.message}</p>
          <p className="hour">{timeString}</p>
        </MessageRecived>
      ) : (
        <MessageSended key={`msg-${index}`}>
          <p className="message">{item.message}</p>
          <p className="hour">{timeString}</p>
        </MessageSended>
      );

      elements.push(messageComponent);
    });

    return elements;
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <ChatMessages style={{ width: props.full ? "100%" : "", height: props.full ? "100%" : "" }}>
      {finished && props.type == "user" ? (
        <FinishedContainer>
          <span>
            <div onClick={() => setFinished(false)}>
              <MySvg src="/icons/close.svg" />
            </div>
            <h1>{finishedClosed == true && avaliable == false ? "Avaliação" : "Avalie sua consulta"}</h1>
            <p>
              Nota: <Rating value={rating} onChange={(e, v) => setRating(v ?? 0)} precision={0.5} readOnly={finishedClosed && !avaliable}></Rating>
            </p>
            <textarea
              readOnly={finishedClosed && !avaliable}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="se quiser nos conte como foi seu atendimento "
            ></textarea>
            {finishedClosed && !avaliable ? <></> : <button onClick={finishService}>Enviar</button>}
          </span>
        </FinishedContainer>
      ) : (
        <>
          {finished && props.type == "nutri" && finishedClosed ? (
            <FinishedContainer>
              <span>
                <div onClick={() => setFinished(false)}>
                  <MySvg src="/icons/close.svg" />
                </div>
                <h1>{finishedClosed ? "Avaliação" : "Avalie sua consulta"}</h1>
                <p>
                  Nota: <Rating value={rating} onChange={(e, v) => setRating(v ?? 0)} precision={0.5} readOnly={finishedClosed}></Rating>
                </p>
                <textarea
                  readOnly={finishedClosed}
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  placeholder="se quiser nos conte como foi seu atendimento "
                ></textarea>
                {finishedClosed ? <></> : <button onClick={finishService}>Enviar</button>}
              </span>
            </FinishedContainer>
          ) : (
            <></>
          )}
        </>
      )}

      <ChatMessagesHeader>
        <ChatMessagesImg>
          <ChatImg src={picture ?? "/png/logo.jpg"}></ChatImg>
        </ChatMessagesImg>
        <ChatMessagesName>
          <p className="nameUser"> {name}</p>
          <p className="status">{isOnline ? "Online" : "Offline"}</p>
        </ChatMessagesName>
        <ChatMessagesFinish
          onClick={() => {
            setFinished(true);
            getRating();
          }}
        >
          {!finishedClosed ? "Finalizar Chat" : "Abrir avaliação"}
        </ChatMessagesFinish>

        <ChatMessagesClose src="/icons/close.svg" style={{ marginLeft: "0" }} onClick={() => props.closeChat()} />
      </ChatMessagesHeader>
      <ChatMessagesContainer ref={chatContainerRef} key={"chatMessagesConatiner"}>
        {renderMessagesWithDates(history)}
      </ChatMessagesContainer>
      {finishedClosed ? (
        <ChatFinished>O atendimento foi finalizado.</ChatFinished>
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
