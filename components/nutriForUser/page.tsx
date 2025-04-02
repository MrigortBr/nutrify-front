import { useState } from "react";
import { NutriNav, NutriNavTwo } from "../nutriForNutri/styled";

import { NutriUserContainer } from "./styled";
import NutriComponent from "./Nutri";
import ServiceComponent from "./service";

export function NutriForUserComponent() {
  const [page, setPage] = useState(1);

  return (
    <NutriUserContainer>
      <NutriNavTwo $element={page}>
        <p onClick={() => setPage(1)} className={page == 1 ? "selected" : ""}>
          Nutricionistas
        </p>
        <p onClick={() => setPage(2)} className={page == 2 ? "selected" : ""}>
          Atendimentos
        </p>
      </NutriNavTwo>

      {page == 1 ? <NutriComponent /> : <></>}
      {page == 2 ? <ServiceComponent /> : <></>}
    </NutriUserContainer>
  );
}
