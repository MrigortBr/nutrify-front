import { Stats, StatsInfo, StatsNumber, StatusDesc } from "./styled";

export default function StatsComponent() {
  return (
    <>
      <Stats>
        <StatsInfo>
          <StatsNumber>5</StatsNumber>
          <StatusDesc>Atendimentos</StatusDesc>
        </StatsInfo>
        <StatsInfo>
          <StatsNumber>R$ 300,52</StatsNumber>
          <StatusDesc>Vendas</StatusDesc>
        </StatsInfo>
        <StatsInfo>
          <StatsNumber></StatsNumber>
          <StatusDesc>Avaliações</StatusDesc>
        </StatsInfo>
      </Stats>
    </>
  );
}
