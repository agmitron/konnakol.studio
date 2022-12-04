import { PitchDetector, ProbabalisticPitchDetector } from 'pitchfinder/lib/detectors/types';
import { Frequency } from 'utils/frequency';
export declare enum PitcherName {
    ACF2PLUS = "ACF2PLUS",
    AMDF = "AMDF",
    YIN = "YIN",
    Macleod = "Macleod"
}
export declare const pitchers: Record<PitcherName, Pitcher>;
type PitchResult = Frequency | null;
export interface Pitcher {
    name: PitcherName;
    detect: (float32Array: Float32Array) => PitchResult;
}
export declare function mapPitcher(pitcher: PitchDetector | ProbabalisticPitchDetector, name: PitcherName): Pitcher;
export {};
