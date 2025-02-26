"use client";
import { useEffect, useState } from "react";

export default function MySvg(props: { src: string }) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch(props.src)
      .then((res) => res.text())
      .then(setSvgContent);
  }, []);

  return <span dangerouslySetInnerHTML={{ __html: svgContent }} />;
}
