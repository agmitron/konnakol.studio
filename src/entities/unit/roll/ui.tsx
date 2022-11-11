import "./Roll.css";
import Note from "~/entities/unit/note/ui";
import Chord from "~/entities/unit/chord/ui";
import { Selectable } from "~/shared/utils/types.utils";
import { isChord } from '~/entities/unit/chord/model';
import { RollChildren } from "./model";

interface IRollProps extends Selectable {
  beats: RollChildren;
}

const Roll: React.FC<IRollProps> = ({ beats }) => {
  return (
    <div className="unit--type--roll">
      {beats.map((beat, i) => {
        if (isChord(beat)) {
          return <Chord notes={beat.children} key={i} />;
        }

        return (
          <Note symbol={beat.symbol} color={beat.color} key={i} />
        );
      })}
    </div>
  );
};

export default Roll;
