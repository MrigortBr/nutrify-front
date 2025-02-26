import ComponentPost from "../ComponentPost/page";

type Props = {
  closeCall?: (tag: string) => void;
};

export default function ModalNewPost(props: Props) {
  return (
    <span style={{ position: "absolute", backgroundColor: "white", borderRadius: "20px" }}>
      <ComponentPost closeCall={props.closeCall} />
    </span>
  );
}
