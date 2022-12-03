import { Frequency } from 'utils/frequency';
import Chord from '../chord';
import Sound from '../sound';
import { Unit, CompositeUnit, UnitKind, UnitType, Beat } from '../shared';
export declare const isRoll: (unit: Unit) => unit is Roll;
export type RollChildren = (Sound | Chord)[];
export default class Roll implements CompositeUnit<RollChildren> {
    readonly children: RollChildren;
    readonly kind = UnitKind.Composite;
    readonly type = UnitType.Roll;
    currentFraction: Beat | null;
    constructor(children: RollChildren);
    play(bpm: number): AsyncGenerator<Beat, void, unknown>;
    check(receivedFrequency: Frequency): boolean;
}
