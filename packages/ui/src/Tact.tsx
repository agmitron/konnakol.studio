import React from "react";
import UnitWrapper from "./UnitWrapper";
import { Unit } from "entities";
import { styled } from "@mui/material";

interface ITactProps {
  units: Unit[];
  isSelected?: boolean;
  selectedUnitIndex?: number;
}

const Root = styled("div")`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  border-bottom: 1px solid lightslategray;
  padding: 15px 0;
  background-color: ${(p: { isSelected?: boolean }) =>
    p.isSelected ? "#FEEAD9" : "transparent"};
  border-radius: ${(p: { isSelected?: boolean }) =>
    p.isSelected ? "10px" : "0"};
`;

function Tact(props: ITactProps) {
  return (
    <Root isSelected={props.isSelected}>
      {props.units.map((unit, index) => (
        <UnitWrapper
          key={index}
          unit={unit}
          isSelected={props.isSelected && props.selectedUnitIndex === index}
        />
      ))}
    </Root>
  );
}

export default Tact;
