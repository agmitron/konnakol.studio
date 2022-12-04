export interface IWebAudioAPI {
    audioContext: AudioContext;
    sourceAudioNode: MediaStreamAudioSourceNode;
    analyserAudioNode: AnalyserNode;
    buffer: Float32Array;
}
export declare function initializeWebAudioApi(): Promise<IWebAudioAPI>;
