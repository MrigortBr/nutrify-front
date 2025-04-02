import { useEffect, useState } from "react";
import { NutriNav } from "../nutriForNutri/styled";
import {
  BestNutri,
  BestNutriName,
  BestNutriPicture,
  BestNutriStars,
  ExploreFilter,
  ExploreFilterField,
  ExploreFilterFieldTwo,
  ExploreNutri,
  ExploreTitle,
  NutriExplore,
  NutriExploreName,
  NutriExplorePicture,
  NutriInfo,
  NutriMore,
  NutriPage,
  NutriUserContainer,
  OneNutri,
  ResultsExplore,
  ThreeNutri,
  TwoNutri,
} from "./styled";
import { Rating } from "@mui/material";
import MySvg from "../MySvg/page";
import { openModal } from "../MyCustomModal/page";
import CardNutri from "../CardNutri/page";
import { getAllNutri, NutriSimple } from "@/service/requests/Nutri";
import { showAlert } from "../alert/page";
import { formatCurrency } from "@/service/formatCurrency";

export const bestNutriData: NutriSimple[] = [
  { name: "Igor", picture: "", number_service: 5, nutri_id: 0, price: 100, rating: 5 },
  { name: "Igor", picture: "", number_service: 5, nutri_id: 0, price: 100, rating: 5 },
  { name: "Igor", picture: "", number_service: 5, nutri_id: 0, price: 100, rating: 5 },
];

export default function NutriComponent() {
  const [bestNutri, setBestNutri] = useState<NutriSimple[]>([]);
  const [nutri, SetNutri] = useState<NutriSimple[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  async function getData() {
    const data = await getAllNutri();

    if (!data.success) showAlert(data.data?.message ?? "", "error");

    if (data.data?.nutriSimple) {
      const top3Nutris = [...data.data.nutriSimple].sort((a, b) => b.rating - a.rating).slice(0, 3);
      setBestNutri(top3Nutris);

      SetNutri(data.data.nutriSimple);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NutriPage>
      <BestNutri>
        {bestNutri[2] ? (
          <ThreeNutri onClick={() => openModal(<CardNutri value={bestNutri[2]} />)}>
            <BestNutriPicture src={bestNutri[2].picture ?? "/png/remo.jpg"} />
            <BestNutriName>{bestNutri[2].name}</BestNutriName>
            <BestNutriStars>
              <span>
                <Rating name="half-rating" defaultValue={bestNutri[2].rating ?? 0} precision={0.5} readOnly />
              </span>
              <p>Avaliação: {bestNutri[2].rating.toString().slice(0, 4)} / 5</p>
            </BestNutriStars>
          </ThreeNutri>
        ) : (
          <></>
        )}
        {bestNutri[0] ? (
          <OneNutri onClick={() => openModal(<CardNutri value={bestNutri[0]} />)}>
            <BestNutriPicture src={bestNutri[0].picture ?? "/png/remo.jpg"} />
            <BestNutriName>{bestNutri[0].name}</BestNutriName>
            <BestNutriStars>
              <span>
                <Rating name="half-rating" defaultValue={bestNutri[0].rating ?? 0} precision={0.5} readOnly />
              </span>
              <p>Avaliação: {bestNutri[0].rating.toString().slice(0, 4)} / 5</p>
            </BestNutriStars>
          </OneNutri>
        ) : (
          <></>
        )}
        {bestNutri[1] ? (
          <TwoNutri onClick={() => openModal(<CardNutri value={bestNutri[1]} />)}>
            <BestNutriPicture src={bestNutri[1].picture ?? "/png/remo.jpg"} />
            <BestNutriName>{bestNutri[1].name}</BestNutriName>
            <BestNutriStars>
              <span>
                <Rating name="half-rating" defaultValue={bestNutri[1].rating ?? 0} precision={0.5} readOnly />
              </span>
              <p>Avaliação: {bestNutri[1].rating.toString().slice(0, 4)} / 5</p>
            </BestNutriStars>
          </TwoNutri>
        ) : (
          <></>
        )}
      </BestNutri>
      <ExploreTitle>Descobrir </ExploreTitle>

      {/* <ExploreNutri>
        <input type="text" placeholder="Fazer busca" />
        <button onClick={() => setShowFilter((o) => !o)}>
          Filtrar por
          <MySvg src="/icons/filter.svg" />
        </button>
        {showFilter ? (
          <ExploreFilter>
            <ExploreFilterField>
              Atendimentos: <input type="number" placeholder="De" /> - <input type="text" placeholder="Até" />
            </ExploreFilterField>
            <ExploreFilterFieldTwo>
              <p>Avaliações:</p>
              <span>
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
              </span>
            </ExploreFilterFieldTwo>
            <ExploreFilterField>
              Preço: <input type="number" placeholder="De" /> - <input type="text" placeholder="Até" />
            </ExploreFilterField>
          </ExploreFilter>
        ) : (
          <></>
        )}
      </ExploreNutri> */}

      <ResultsExplore>
        {nutri.map((v, i) => (
          <NutriExplore key={i}>
            <NutriExplorePicture src={v.picture ?? "/png/remo.jpg"} />
            <NutriExploreName>{v.name}</NutriExploreName>
            <NutriInfo>
              <p>Atendimentos: {v.number_service}</p>
              <p>Preço por hora: {formatCurrency(v.price)}</p>
              <span>
                Nota:
                <Rating name="half-rating" value={v.rating} precision={0.5} readOnly />
              </span>
            </NutriInfo>
            <NutriMore onClick={() => openModal(<CardNutri value={v} />)}>Ver Nutricionista</NutriMore>
          </NutriExplore>
        ))}
      </ResultsExplore>
    </NutriPage>
  );
}
