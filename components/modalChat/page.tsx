import { ChangeEvent, useEffect, useRef, useState } from "react";
import { openModal } from "../MyCustomModal/page";
import {
  ChatClose,
  ChatContainer,
  ChatHeader,
  ChatImg,
  ChatLeft,
  ChatName,
  Chat,
  ChatTitle,
  ChatImgBackground,
  LastMessage,
  TypeChat,
  ChatMessages,
  ChatMessagesHeader,
  ChatMessagesClose,
  ChatMessagesName,
  ChatMessagesImg,
  ChatMessagesContainer,
  MessageRecived,
  MessageSended,
  ChatInputs,
  TextareaContainer,
  ChatDigit,
  ChatImgContainer,
  NoChatSelected,
  NoChatToMessage,
} from "./styled";
import MySvg from "../MySvg/page";
import { socket } from "../menu/page";
import { dataHistory } from "@/service/socket/types";
import LoadingSpinner from "../LoadingSpinner/page";
import { showAlert } from "../alert/page";
import { getServices, NutriLast, NutriOpen } from "@/service/requests/Nutri";
import ChatNutriComponent from "./ChatNutri";

type UsersChats = {
  message: string;
  created_at: string; // Pode ser Date se você quiser manipular como objeto Date
  user: {
    username: string;
    picture: string | null; // A imagem pode ser null, ou uma string caso exista um URL
  };
  noRead: number; // Contagem de mensagens não lidas
};

type Props = {
  closeCall?: (tag: string) => void;
  chatNew?: { username: string; picture: string };
};

export default function ModalChat(props: Props) {
  const [typeChat, setTypeChat] = useState<"nutri" | "friends">("friends");
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("foto");
  const [history, setHistory] = useState<dataHistory[]>([]);
  const [chatUsers, setChatUsers] = useState<UsersChats[]>([]);
  const [load, setLoad] = useState(true);
  const [loadChat, setLoadChat] = useState(true);
  const [changeInput, setChangeInput] = useState<NodeJS.Timeout>();
  const [digit, setDigit] = useState<boolean>(false);
  const [chatSelected, setChatSelected] = useState<boolean>(false);
  const [chatTypeSelected, setChatTypeSelected] = useState<"nutri" | "friends">("friends");
  const [openSelected, setOpenSelected] = useState<NutriOpen>();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [last, setLast] = useState<NutriOpen[]>([]);
  const [open, setOpen] = useState<NutriOpen[]>([]);

  function close() {
    if (props.closeCall) {
      props.closeCall(".message.");
    }

    openModal(<></>);
  }

  async function getDataNutri() {
    const data = await getServices();

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.servicesLast) {
      setLast(data.data?.servicesLast);
    }

    if (data.data?.servicesOpen) {
      setOpen(data.data.servicesOpen);
    }
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  function getChatHistory() {
    socket.on(`${socket.id}${username}getHistory`, (data: dataHistory[]) => {
      setHistory(data);
      socket.off(`${socket.id}${username}getHistory`);
    });
    socket.emit("getHistory", { username });
  }

  function getUserOnline() {
    socket.on(`${username}Online`, (data: boolean) => {
      setIsOnline(data);
    });
    socket.emit("userIsOnline", { username });
  }

  function switchMessage(data: dataHistory) {
    const updatedChatUsers = chatUsers.map((e) => {
      if (e.user.username === data.myname) {
        return {
          ...e,
          message: data.message,
          noRead: username == data.myname ? 0 : e.noRead + 1,
        };
      }
      return e;
    });

    if (username == data.myname) loadMessagesThisChat(data.myname);

    setChatUsers(updatedChatUsers);
  }

  function openToNew() {
    socket.off(`${socket.id}CurrierChat`);
    socket.on(`${socket.id}CurrierChat`, (data: dataHistory[]) => {
      let isNew = true;
      chatUsers.forEach((element) => {
        if (element.user.username == data[0].myname) {
          isNew = false;
        }
      });

      if (isNew) {
        socket.on(`${socket.id}${data[0].myname}ReciveChat`, (picture: { r: string }) => {
          let img = null;
          if (picture.r != null) img = picture.r;

          const message = data[0];
          const chatNew: UsersChats = {
            created_at: message.created_at,
            message: message.message,
            noRead: 1,
            user: { picture: img, username: message.myname },
          };
          setChatUsers((e) => [chatNew, ...e]);
          socket.off(`${socket.id}${data[0].myname}ReciveChat`);
          socket.off(`${socket.id}CurrierChat`);
        });
        socket.emit(`getChat`, { username: data[0].myname });
      } else {
        switchMessage(data[0]);
      }
    });
  }

  function iRecivedMessage() {
    socket.on(`${socket.id}${username}recivedMessage`, (data: dataHistory[]) => {
      data.forEach((v) => {
        v.mymessage = false;
        addMessage(v);
      });
    });
  }

  function getChats() {
    socket.on(`${socket.id}myChats`, (data: UsersChats[]) => {
      setChatUsers(data);
      setLoad(false);
    });

    socket.emit("myChats");
  }

  useEffect(() => {
    if (props.chatNew) {
      const username = props.chatNew.username;
      setUsername(username);
      const picture = props.chatNew.picture;
      setChatSelected(true);
      setPicture(picture);
    }
  }, []);

  useEffect(() => {
    getChatHistory();
    getUserOnline();
    iRecivedMessage();
  }, [picture]);

  useEffect(() => {
    openToNew();
  }, [chatUsers]);

  useEffect(() => {
    openToNew();
  }, [username]);

  useEffect(() => {
    if (socket.id) getChats();
  }, [socket.id]);

  useEffect(() => {
    setLoadChat(false);
    setTimeout(() => {
      if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;

        const handleResize = () => {
          scrollToBottom();
        };

        handleResize();

        const resizeObserver = new ResizeObserver(() => {
          handleResize();
        });

        resizeObserver.observe(chatContainer);

        resizeObserver.disconnect();
      }
    }, 100);
  }, [history]);

  function SendMessage() {
    socket.on(`${socket.id}${username}sendedMessage`, (data: dataHistory[]) => {
      data.forEach((v) => {
        addMessage(v);
      });
      socket.off(`${socket.id}${username}sendedMessage`);
    });
    socket.emit("sendMessage", { username, message });
  }

  function addMessage(data: dataHistory) {
    setHistory((e) => [...e, data]);
  }

  function setOnChange(username: string) {
    console.log(`${socket.id}${username}`);

    socket.on(`${socket.id}${username}`, (data: { change: boolean }) => {
      setDigit(data.change);
    });
  }

  function loadMessagesThisChat(newUsername: string) {
    socket.emit(`loadMessage`, { username: newUsername });
    const r = chatUsers.find((e) => e.user.username == newUsername);
    if (r) r.noRead = 0;
  }

  function offAllSockets() {
    socket.off(`${socket.id}${username}`);
    socket.off(`${username}Online`);
    socket.off(`${socket.id}${username}recivedMessage`);
    socket.off(`${socket.id}${username}sendedMessage`);
  }

  function openChat(newUsername: string, picture: string | null, noread: number) {
    if (username !== newUsername) {
      offAllSockets();
      setLoadChat(true);
      setUsername(newUsername);
      setOnChange(newUsername);
      setPicture(picture == null ? "/png/remo.jpg" : picture);
      setChatSelected(true);
      if (noread > 0) {
        loadMessagesThisChat(newUsername);
      }
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

  function onChangeTextArea(el: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(el.currentTarget.value);
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatClose src="/icons/close.svg" onClick={close} />
        <ChatTitle>Chat</ChatTitle>
      </ChatHeader>
      {!load ? (
        <>
          <ChatLeft key={"ChatLeft"}>
            <TypeChat $type={typeChat}>
              <p className="friends" onClick={() => setTypeChat("friends")}>
                Pessoal
              </p>
              <p
                className="nutri"
                onClick={() => {
                  setTypeChat("nutri");
                  getDataNutri();
                }}
              >
                Nutricional
              </p>
            </TypeChat>
            {typeChat == "friends" ? (
              <>
                {chatUsers.map((v, index) => (
                  <Chat
                    onClick={() => {
                      setChatTypeSelected("friends");
                      openChat(v.user.username, v.user.picture, v.noRead);
                    }}
                    key={v.user.username}
                  >
                    <ChatImgContainer>
                      <ChatImgBackground>
                        <ChatImg src={v.user.picture == null ? "/png/remo.jpg" : v.user.picture}></ChatImg>
                      </ChatImgBackground>
                    </ChatImgContainer>
                    <ChatName>
                      {v.user.username}
                      {v.noRead > 0 ? <span>{v.noRead}</span> : <></>}
                    </ChatName>
                    <LastMessage>
                      <p className="message">{v.message}</p>
                      <p className="hour">{new Date(v.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}</p>
                    </LastMessage>
                  </Chat>
                ))}

                {chatUsers.length == 0 ? <NoChatToMessage>Sem conversas</NoChatToMessage> : <></>}
              </>
            ) : (
              <>
                {open.map((v, i) => (
                  <Chat
                    key={i}
                    onClick={() => {
                      setChatSelected(true);
                      setChatTypeSelected("nutri");
                      setOpenSelected(v);
                    }}
                  >
                    <ChatImgContainer>
                      <ChatImgBackground>
                        <ChatImg src={v.picture == null ? "/png/remo.jpg" : v.picture}></ChatImg>
                      </ChatImgBackground>
                    </ChatImgContainer>
                    <ChatName>{v.name}</ChatName>
                    <LastMessage>
                      <p className="message">
                        Consulta: {new Date(v.service_init).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </LastMessage>
                  </Chat>
                ))}

                {last.map((v, i) => (
                  <Chat
                    key={i}
                    onClick={() => {
                      setChatSelected(true);
                      setChatTypeSelected("nutri");
                      setOpenSelected(v);
                    }}
                  >
                    <ChatImgContainer>
                      <ChatImgBackground>
                        <ChatImg src={v.picture == null ? "/png/remo.jpg" : v.picture}></ChatImg>
                      </ChatImgBackground>
                    </ChatImgContainer>
                    <ChatName>{v.name}</ChatName>
                    <LastMessage>
                      <p className="message">
                        Consulta: {new Date(v.service_init).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(v.service_final).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </LastMessage>
                  </Chat>
                ))}

                {open.length == 0 && last.length == 0 ? <NoChatToMessage>Sem conversas</NoChatToMessage> : <>{open.length}</>}
              </>
            )}
          </ChatLeft>
          {!loadChat ? (
            <>
              {chatSelected ? (
                <>
                  {chatTypeSelected == "friends" ? (
                    <ChatMessages>
                      <ChatMessagesHeader>
                        <ChatMessagesImg>
                          <ChatImg src={picture ?? "/png/remo.jpg"}></ChatImg>
                        </ChatMessagesImg>
                        <ChatMessagesName>
                          <p className="nameUser"> {username}</p>
                          <p className="status">{isOnline ? "Online" : "Offline"}</p>
                        </ChatMessagesName>
                        <ChatMessagesClose src="/icons/close.svg" />
                      </ChatMessagesHeader>
                      <ChatMessagesContainer ref={chatContainerRef} key={"chatMessagesConatiner"}>
                        {history.map((value, index) =>
                          !value.mymessage ? (
                            <MessageRecived key={index}>
                              <p className="message">{value.message}</p>
                              <p className="hour">
                                {new Date(value.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
                              </p>
                            </MessageRecived>
                          ) : (
                            <MessageSended key={index}>
                              <p className="message">{value.message}</p>
                              <p className="hour">
                                {new Date(value.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
                              </p>
                            </MessageSended>
                          )
                        )}
                      </ChatMessagesContainer>
                      <ChatInputs>
                        <TextareaContainer value={message} onChange={onChangeTextArea} onKeyDown={onKey}></TextareaContainer>
                        <button onClick={SendMessage}>
                          <MySvg src="icons/send.svg"></MySvg>
                        </button>
                      </ChatInputs>
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
                  ) : (
                    <>
                      {openSelected ? (
                        <ChatNutriComponent
                          finished={openSelected.finished}
                          type="user"
                          id={openSelected.id}
                          name={openSelected?.name}
                          nutriId={openSelected?.nutri_id}
                          picture={openSelected?.picture}
                          close={openSelected.rating}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <NoChatSelected>
                  <h1>Selecione um usuario para começar a conversa</h1>
                  <h2>
                    Caso queira iniciar um novo chat clique na opção <b>mensagem</b> no perfil do usuario
                  </h2>
                </NoChatSelected>
              )}
            </>
          ) : (
            <LoadingSpinner noText={true} text={""} style={{ width: "fit-content" }} size={50} />
          )}
        </>
      ) : (
        <LoadingSpinner noText={true} text={""} style={{ width: "fit-content" }} size={50} />
      )}
    </ChatContainer>
  );
}
