import React from "react";
import Sound from "./Sound";
import Chord from "./Chord";
import { Selectable } from "utils/types";
import { isChord, RollChildren } from "entities";
import { styled } from "@mui/material";

interface IRollProps extends Selectable {
  beats: RollChildren;
}

const Root = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 20px;
`;

const Roll: React.FC<IRollProps> = ({ beats }) => {
  return (
    <Root>
      {beats.map((beat, i) => {
        if (isChord(beat)) {
          return <Chord notes={beat.children} key={i} />;
        }

        return <Sound symbol={beat.symbol} color={beat.color} key={i} />;
      })}
    </Root>
  );
};

export default Roll;
