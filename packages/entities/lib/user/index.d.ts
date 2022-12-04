import Sound from '../unit/sound';
import { SingleUnit } from '../unit/shared';
export interface ShorcutsToUnits {
    [shortcut: string]: SingleUnit;
}
export declare const $sounds: import("effector").Store<Sound[]>;
export declare const $soundsAsMapping: import("effector").Store<ShorcutsToUnits>;
export declare const soundDeleted: import("effector").Event<number>;
export declare const soundCreated: import("effector").Event<Sound>;
export * from './api';
