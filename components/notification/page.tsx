import { useEffect, useState } from "react";
import { openModal } from "../MyCustomModal/page";
import {
  ContainerNotification,
  NotificationClose,
  NotificationHeader,
  NotificationItem,
  NotificationItemsContainer,
  NotificationItemTitle,
  NotificationTitle,
} from "./styled";
import { socket } from "../menu/page";
import SimpleRevenue from "../NutriConfigComponents/SimpleRevenue";
import { Routes } from "@/enum/Routes";
import { useRouter } from "next/navigation";

type Notification = {
  id: number;
  user_one: number;
  user: number;
  message: string;
  link: string;
  type: "chat" | "post" | "profile"; // ajuste conforme os tipos possíveis
  created_at: string; // ou `Date` se você estiver convertendo
  read: boolean;
};

type Props = {
  closeCall: (tag: string) => void;
};

export default function ModalNotifications(props: Props) {
  const [notification, setNotification] = useState<Notification[]>([]);
  const router = useRouter();

  function listenNotifications() {
    socket.off("sendNotification");
    socket.on("sendNotification", (data: Notification[]) => {
      setNotification(data);
    });
  }

  useEffect(() => {
    listenNotifications();
    socket.emit("getNotification");
  }, []);

  function close() {
    props.closeCall(".alert.");
    openModal(<></>);
  }

  return (
    <ContainerNotification>
      <NotificationHeader>
        <NotificationTitle>Notificações</NotificationTitle>
        <NotificationClose src="/icons/close.svg" onClick={close} />
      </NotificationHeader>
      <NotificationItemsContainer>
        {notification.map((v, i) => (
          <NotificationItem
            $read={v.read}
            key={i}
            onClick={() => {
              if (v.type == "profile") {
                router.push(Routes.profile);
              } else if (v.type == "post") {
                router.push(Routes.post + v.link.replace("/post?id=", ""));
              }
            }}
          >
            <NotificationItemTitle>{v.message}</NotificationItemTitle>
          </NotificationItem>
        ))}
      </NotificationItemsContainer>
    </ContainerNotification>
  );
}
