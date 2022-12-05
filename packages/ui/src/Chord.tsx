import React from "react";
import { useMemo } from "react";
import { SingleUnit } from "entities";
import { styled } from "@mui/material";

interface IChordComponentProps {
  notes: SingleUnit[];
}

const Root = styled("div")`
  display: flex;
  gap: 5px;
  font-size: 16px;
`;

const Column = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChordComponent: React.FC<IChordComponentProps> = ({ notes }) => {
  const columns = useMemo(
    () =>
      notes.reduce<SingleUnit[][]>(
        (acc, el) => {
          const last = acc.at(-1);

          if (last && last.length < 2) {
            last.push(el);
            return acc;
          }

          return [...acc, [el]];
        },
        [[]]
      ),
    [notes]
  );

  return (
    <Root>
      {columns.map((c, i) => (
        <Column key={i}>
          {c.map(({ symbol, color }, i) => (
            <span style={{ color }} key={`${color}-${symbol}#${i}`}>
              {symbol}
            </span>
          ))}
        </Column>
      ))}
    </Root>
  );
};

export default ChordComponent;
