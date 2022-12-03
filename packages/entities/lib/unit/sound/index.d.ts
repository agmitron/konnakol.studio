import { Frequency } from 'utils/frequency';
import { Unit, Renderable, SingleUnit, UnitKind, UnitType, WithFrequencies } from '../shared';
interface SoundConfig {
    frequencies: Frequency[];
    symbol: string;
    color?: string;
    shortcut?: string;
}
export declare const isSound: (unit: Unit) => unit is Sound;
export default class Sound implements SingleUnit, Renderable, WithFrequencies {
    readonly kind: UnitKind.Single;
    readonly type: UnitType.Sound;
    readonly frequencies: Frequency[];
    readonly symbol: string;
    readonly color: string;
    readonly shortcut: string;
    constructor(config: SoundConfig);
    play(bpm: number): AsyncGenerator<this, void, unknown>;
    check(receivedFrequency: Frequency): boolean;
}
export {};
