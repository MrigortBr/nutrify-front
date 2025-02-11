import { CircularProgress } from "@mui/material";
import { LoginButton } from "../login/styles";

type Props = {
  sending: "sending" | "free";
  function: () => void;
  children: React.ReactNode;
  multiplier?: number;
  style?: React.CSSProperties;
};

export default function FormButton(props: Props) {
  return (
    <LoginButton $multiplier={props.multiplier} style={props.style} $sending={props.sending} onClick={props.function}>
      {props.sending == "sending" ? <CircularProgress size={"2rem"} sx={{ color: "rgb(89, 199, 21)" }} /> : props.children}
    </LoginButton>
  );
}
