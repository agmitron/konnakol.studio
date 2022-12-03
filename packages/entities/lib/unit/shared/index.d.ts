import { Frequency } from 'utils/frequency';
export declare enum UnitKind {
    Composite = "composite",
    Single = "single"
}
export declare enum UnitType {
    Sound = "note",
    Chord = "chord",
    Roll = "roll"
}
export interface Unit {
    readonly kind: UnitKind;
    readonly type: UnitType;
    play: (bpm: number) => AsyncGenerator<Unit & WithFrequencies>;
    check: (receivedFrequency: Frequency) => boolean;
}
export interface WithFrequencies {
    readonly frequencies: Frequency[];
}
export interface Renderable {
    readonly symbol: string;
    readonly color: string;
    readonly shortcut: string;
}
export interface SingleUnit extends Unit, Renderable, WithFrequencies {
    readonly kind: UnitKind.Single;
    readonly type: UnitType.Sound;
}
export interface CompositeUnit<Children extends Unit[]> extends Unit {
    readonly kind: UnitKind.Composite;
    readonly type: UnitType.Chord | UnitType.Roll;
    readonly children: Children;
}
export type Beat = Unit & WithFrequencies;
export declare const hasFrequencies: (unit: Unit) => unit is Unit & WithFrequencies;
export declare const isRenderable: (unit: Unit) => unit is Unit & Renderable;
