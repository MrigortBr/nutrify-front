import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";
import { LoadingText, SpinnerContainer } from "./styled";
import { useEffect, useRef, useState } from "react";

type props = {
  text: string | string[];
  temp?: number;
  style?: React.CSSProperties;
  noText?: boolean;
  size?: number;
};

const LoadingSpinner = (props: props) => {
  const [text, setText] = useState("Carregando");
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      effectRan.current = true;
      if (typeof props.text == "string") {
        setText(props.text);
      } else {
        let index = 0;
        setInterval(() => {
          if (index == props.text.length) {
            index = 0;
            return;
          }

          setText(props.text[index]);

          index++;
        }, props.temp ?? 1000);
      }
    }
  }, []);

  return (
    <SpinnerContainer style={props.style}>
      <CircularProgress size={props.size || 50} />
      {!props.noText ? <LoadingText>{text}</LoadingText> : <></>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
