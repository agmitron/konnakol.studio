import { Pitcher } from './shared';
import { IWebAudioAPI } from './web-audio';
export interface DetectPitchInBackgroundFxParams {
    webAudio: IWebAudioAPI;
    pitcher: Pitcher;
}
export declare const initializeWebAudioApiFx: import("effector").Effect<void, IWebAudioAPI, Error>;
export declare const detectPitchInBackgroundFx: import("effector").Effect<DetectPitchInBackgroundFxParams, number | null, Error>;
export declare const $pitcher: import("effector").Store<Pitcher>;
export declare const $frequency: import("effector").Store<number>;
export declare const $webAudio: import("effector").Store<IWebAudioAPI | null>;
export declare const requestWebAudioAPI: import("effector").Event<void>;
export declare const startListeningMicro: import("effector").Event<void>;
export declare const stopListeningMicro: import("effector").Event<void>;
