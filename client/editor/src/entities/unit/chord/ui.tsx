import { useMemo } from 'react';
import { SingleUnit } from "~/entities/unit/shared";
import "./Chord.css";

interface IChordComponentProps {
  notes: SingleUnit[];
}

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
    <div className="unit--type--chord">
      {columns.map((c, i) => (
        <div className="unit--type--chord__column" key={i}>
          {c.map(({ symbol, color }, i) => (
            <span style={{ color }} key={`${color}-${symbol}#${i}`}>
              {symbol}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChordComponent;
