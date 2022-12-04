"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopListeningMicro = exports.startListeningMicro = exports.requestWebAudioAPI = exports.$webAudio = exports.$frequency = exports.$pitcher = exports.detectPitchInBackgroundFx = exports.initializeWebAudioApiFx = void 0;
const effector_1 = require("effector");
const patronum_1 = require("patronum");
const shared_1 = require("./shared");
const web_audio_1 = require("./web-audio");
exports.initializeWebAudioApiFx = (0, effector_1.createEffect)(web_audio_1.initializeWebAudioApi);
exports.detectPitchInBackgroundFx = (0, effector_1.createEffect)(({ webAudio: { analyserAudioNode, buffer }, pitcher }) => {
    analyserAudioNode.getFloatTimeDomainData(buffer);
    return pitcher.detect(buffer);
});
exports.$pitcher = (0, effector_1.createStore)(shared_1.pitchers.ACF2PLUS);
exports.$frequency = (0, effector_1.createStore)(0);
exports.$webAudio = (0, effector_1.createStore)(null);
exports.requestWebAudioAPI = (0, effector_1.createEvent)();
exports.startListeningMicro = (0, effector_1.createEvent)();
exports.stopListeningMicro = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: exports.startListeningMicro,
    filter: (0, patronum_1.not)(exports.$webAudio),
    target: exports.initializeWebAudioApiFx
});
(0, effector_1.sample)({
    clock: exports.initializeWebAudioApiFx.doneData,
    source: exports.$webAudio,
    fn: (_, webAudio) => webAudio,
    target: exports.$webAudio
});
(0, effector_1.sample)({
    clock: exports.requestWebAudioAPI,
    target: exports.initializeWebAudioApiFx
});
const { tick } = (0, patronum_1.interval)({
    start: exports.startListeningMicro,
    stop: exports.stopListeningMicro,
    timeout: 1000 / 60,
    leading: true
});
(0, effector_1.sample)({
    clock: tick,
    source: { webAudio: exports.$webAudio, pitcher: exports.$pitcher },
    filter: (params) => Boolean(params.webAudio),
    fn: (params) => params,
    target: exports.detectPitchInBackgroundFx
});
(0, effector_1.sample)({
    clock: exports.detectPitchInBackgroundFx.doneData,
    filter: (frequency) => !!frequency,
    fn: (frequency) => frequency,
    target: exports.$frequency
});
//# sourceMappingURL=index.js.map