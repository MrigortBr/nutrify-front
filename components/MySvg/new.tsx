"use client";
import { useEffect, useState } from "react";

// Cache de SVGs carregados
const svgCache: { [key: string]: string } = {};

export default function MySvgNew(props: { src: string }) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  console.log("fazendo feetch");

  useEffect(() => {
    // Verificar se o SVG já está no cache
    console.log("fazendo feetchAQ");

    if (svgCache[props.src]) {
      setSvgContent(svgCache[props.src]);
    } else {
      // Carregar o SVG e armazená-lo no cache
      fetch(props.src)
        .then((res) => res.text())
        .then((content) => {
          svgCache[props.src] = content; // Armazenar o SVG no cache
          setSvgContent(content);
        });
    }
  }, [props.src]);

  if (!svgContent) return <span>Loading...</span>; // Opcional: exibir algo enquanto o SVG carrega

  return <span dangerouslySetInnerHTML={{ __html: svgContent }} />;
}
