import { JSX, useState } from "react";
import { BackgroundModal } from "./styled";

let openModalFunction: ((component: JSX.Element) => void) | null = null;

export function useModal() {
  const [, setToggle] = useState(false);
  openModalFunction = (component: JSX.Element) => setToggle((prev) => !prev);
}

export default function MyModal() {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const [reverse, setReverse] = useState(false);

  openModalFunction = (comp) => {
    if (open) {
      setReverse(true);
      setTimeout(() => {
        setOpen((o) => !o);
        setReverse(false);
        setComponent(comp);
      }, 1000);
    } else {
      setOpen((o) => !o);
      setComponent(comp);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <BackgroundModal $reverse={reverse} style={{ display: open ? "" : "none" }}>
      {component}
    </BackgroundModal>
  );
}

export function openModal(component: JSX.Element) {
  if (openModalFunction) {
    openModalFunction(component);
  }
}
