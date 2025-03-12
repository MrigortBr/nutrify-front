import { ChangeEvent, useRef, useState } from "react";
import {
  ContentFinded,
  Profile,
  ProfileInfo,
  ProfilePicture,
  ProfilePictureSpan,
  ProfilesFinded,
  SearchBackground,
  SearchClose,
  SearchHeader,
  SearchInput,
} from "./styled";
import LoadingSpinner from "../LoadingSpinner/page";
import { socket } from "../menu/page";
import { searchProfileResponse } from "@/service/socket/types";
import { Routes } from "@/enum/Routes";
import { useRouter } from "next/navigation";
import { HeaderClose } from "../ComponentPost/styled";
import { openModal } from "../MyCustomModal/page";

type Props = {
  closeCall: (tag: string) => void;
};

export default function ModalSearch(props: Props) {
  const myTimeOut = useRef<NodeJS.Timeout>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState<boolean>(false);
  const [profileResult, setProfileResult] = useState<searchProfileResponse[]>([]);
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
    setSearch(true);
    const localMessage = event.target.value;

    if (myTimeOut.current) clearTimeout(myTimeOut.current);

    myTimeOut.current = setTimeout(() => {
      sendSearch(localMessage);
    }, 500);
  }

  function sendSearch(message: string) {
    setSearch(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on(`${socket.id}getProfile${message}`, (data: searchProfileResponse[]) => {
      console.log(data);
      setProfileResult(data);
      setSearch(false);
      socket.off(`${socket.id}getProfile${message}`);
    });

    socket.emit("getProfile", { search: message });
  }

  function close() {
    openModal(<></>);

    props.closeCall(".search.");
  }

  function openProfile(username: string) {
    close();
    router.push(`${Routes.profile}?u=${username}`);
  }

  return (
    <SearchBackground>
      <SearchHeader>
        <SearchInput value={message} onChange={(e) => handleChange(e)} placeholder="Faça sua busca"></SearchInput>
        <SearchClose src="/icons/close.svg" onClick={close} />
      </SearchHeader>
      <ContentFinded>
        {search ? (
          <LoadingSpinner text={"Realizando busca"} />
        ) : (
          <>
            {profileResult.length > 0 ? (
              <ProfilesFinded>
                <h1>Perfis encontrados</h1>
                {profileResult.map((v, i) => (
                  <Profile key={i} onClick={() => openProfile(v.username)}>
                    <ProfilePictureSpan>
                      <ProfilePicture src={v.picture ?? "/png/remo.jpg"} />
                    </ProfilePictureSpan>
                    <ProfileInfo>
                      <h1>{v.username}</h1>
                      <h2>{v.name}</h2>
                    </ProfileInfo>
                  </Profile>
                ))}
              </ProfilesFinded>
            ) : (
              <></>
            )}
          </>
        )}
      </ContentFinded>
    </SearchBackground>
  );
}
