import { useEffect, useState } from "react";
import io from "socket.io-client";
import { simpleProfile } from "../requests/profile";

let socket: SocketIOClient.Socket;

const useSocket = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [simpleProfile, setSimpleProfile] = useState<simpleProfile>();

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:2000", {
      reconnectionAttempts: 4000, // Número de tentativas de reconexão antes de desistir
    });
    const simpleS = localStorage.getItem("simpleProfile");
    if (simpleS) {
      const simple: simpleProfile = JSON.parse(simpleS);
      setSimpleProfile(simple);
      const username = simple.username;
      socket.emit("loadMy", { username });
    } else {
      socket.disconnect();
    }
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("message", message);
  };

  return { sendMessage, response, socket };
};

export default useSocket;

export function createMySocket() {
  socket = io(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:2000", {
    reconnectionAttempts: 5, // Número de tentativas de reconexão antes de desistir
  });
  const simpleS = localStorage.getItem("simpleProfile");
  if (simpleS) {
    const simple: simpleProfile = JSON.parse(simpleS);
    const username = simple.username;
    socket.emit("loadMy", { username });
  } else {
    socket.disconnect();
  }

  return socket;
}
