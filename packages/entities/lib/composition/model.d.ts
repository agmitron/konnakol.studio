import { Beat } from '../unit/shared';
import { Indexed } from 'utils/types';
import Tact from '../unit/tact';
type UpdateHandler = (state: ICompositionState) => void;
export type Pattern = Tact[];
export type CompositionId = number;
export interface ICompositionConfig {
    readonly id: CompositionId;
    readonly name: string;
    readonly pattern: Pattern;
    readonly bpm: number;
    readonly size: number;
}
export interface ICompositionState {
    tact: Indexed & Tact;
    beat: Indexed & Beat;
}
export interface IComposition extends ICompositionConfig {
    play: (bpm?: number) => Promise<Composition>;
}
export default class Composition implements IComposition {
    readonly id: CompositionId;
    readonly name: string;
    readonly pattern: Pattern;
    readonly bpm: number;
    readonly size: number;
    private iterator;
    private listeners;
    constructor(config: ICompositionConfig);
    play(bpm?: number): Promise<this>;
    stop(): Promise<this>;
    subscribe(listener: UpdateHandler): this;
    unsubscribe(): this;
    stringify(): string;
    private transition;
}
export {};
