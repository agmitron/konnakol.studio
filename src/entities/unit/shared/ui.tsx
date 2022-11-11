import React from "react";
import Note from "~/entities/unit/note/ui";
import Chord from "~/entities/unit/chord/ui";
import Roll from "~/entities/unit/roll/ui";
import Unit from "~/entities/unit/shared";
import { isNote } from "~/entities/unit/note/model";
import { isChord } from "~/entities/unit/chord/model";
import { isRoll } from "~/entities/unit/roll/model";
import { styled } from "@mui/material";

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
  padding: 20px;
  border-radius: ${(p: { isSelected: boolean }) => (p.isSelected ? "5px" : 0)};
  background-color: ${(p: { isSelected: boolean }) =>
    p.isSelected ? "rgba(239, 177, 60, 0.5)" : "transparent"};
`;

const UnitWrapper: React.FC<IUnitProps> = ({ unit, isSelected = false }) => {
  let component = <div>???</div>;

  if (isNote(unit)) {
    component = <Note symbol={unit.symbol} color={unit.color} />;
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
