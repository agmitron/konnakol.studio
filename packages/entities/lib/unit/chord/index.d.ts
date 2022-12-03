import { Frequency } from 'utils/frequency';
import { Unit, CompositeUnit, SingleUnit, UnitKind, UnitType, WithFrequencies } from '../shared';
export declare const isChord: (unit: Unit) => unit is Chord;
export default class Chord implements CompositeUnit<SingleUnit[]>, WithFrequencies {
    readonly children: SingleUnit[];
    readonly frequencies: Frequency[];
    readonly kind: UnitKind.Composite;
    readonly type: UnitType.Chord;
    constructor(children: SingleUnit[]);
    play(bpm: number): AsyncGenerator<this, void, unknown>;
    check(receivedFrequency: Frequency): boolean;
}
