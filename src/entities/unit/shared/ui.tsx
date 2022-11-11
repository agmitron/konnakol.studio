import "./Unit.css";
import React from "react";
import classNames from "classnames";
import Note from "~/entities/unit/note/ui";
import Chord from "~/entities/unit/chord/ui";
import Roll from "~/entities/unit/roll/ui";
import Unit from "~/entities/unit/shared";
import { isNote } from "~/entities/unit/note/model";
import { isChord } from "~/entities/unit/chord/model";
import { isRoll } from "~/entities/unit/roll/model";

interface IUnitProps {
  unit: Unit;
  selected?: boolean;
}

const UnitComponent: React.FC<IUnitProps> = ({ unit, selected = false }) => {
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

  return (
    <div
      className={classNames("unit-wrapper", {
        "unit-wrapper--selected": selected,
      })}
    >
      {component}
    </div>
  );
};

export default UnitComponent;
