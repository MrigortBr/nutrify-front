import { picture } from "@/service/requests/profile";
import ComponentPost from "../ComponentPost/page";

type Props = {
  closeCall?: (tag: string) => void;
  post: picture;
};

export default function ModalEditPost(props: Props) {
  return (
    <span style={{ position: "absolute", backgroundColor: "white", borderRadius: "20px" }}>
      <ComponentPost closeCall={props.closeCall} post={props.post} />
    </span>
  );
}
