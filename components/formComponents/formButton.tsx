import { CircularProgress } from "@mui/material";
import { LoginButton } from "../login/styles";

type Props = {
  sending: "sending" | "free";
  function: () => void;
  children: React.ReactNode; // Permite receber conteúdo dentro do botão
};

export default function FormButton(props: Props) {
  return (
    <LoginButton sending={props.sending} onClick={props.function}>
      {props.sending == "sending" ? <CircularProgress size={"2rem"} sx={{ color: "rgb(89, 199, 21)" }} /> : props.children}
    </LoginButton>
  );
}
