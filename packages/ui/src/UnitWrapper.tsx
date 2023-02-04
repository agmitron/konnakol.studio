import React from "react";
import { styled } from "@mui/material";
import Sound from "./Sound";
import Chord from "./Chord";
import Roll from "./Roll";
import { Unit, isSound, isChord, isRoll } from "entities";

interface IUnitProps {
  unit: Unit;
  isSelected?: boolean;
}

const Root = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border-radius: ${(p: { isSelected: boolean }) => (p.isSelected ? "5px" : 0)};
  background-color: ${(p: { isSelected: boolean }) =>
    p.isSelected ? "rgba(239, 177, 60, 0.5)" : "transparent"};
`;

const UnitWrapper: React.FC<IUnitProps> = ({ unit, isSelected = false }) => {
  let component = <div>???</div>;

  if (isSound(unit)) {
    component = <Sound symbol={unit.symbol} color={unit.color} />;
  }

  if (isChord(unit)) {
    component = <Chord notes={unit.children} />;
  }

  if (isRoll(unit)) {
    component = <Roll beats={unit.children} />;
  }

  return <Root isSelected={isSelected}>{component}</Root>;
};

export default UnitWrapper;
