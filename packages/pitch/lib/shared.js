"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPitcher = exports.pitchers = exports.PitcherName = void 0;
const pitchfinder_1 = require("pitchfinder");
const constants_1 = require("utils/constants");
var PitcherName;
(function (PitcherName) {
    PitcherName["ACF2PLUS"] = "ACF2PLUS";
    PitcherName["AMDF"] = "AMDF";
    PitcherName["YIN"] = "YIN";
    PitcherName["Macleod"] = "Macleod";
})(PitcherName = exports.PitcherName || (exports.PitcherName = {}));
exports.pitchers = {
    [PitcherName.ACF2PLUS]: mapPitcher((0, pitchfinder_1.ACF2PLUS)({ sampleRate: constants_1.SAMPLE_RATE }), PitcherName.ACF2PLUS),
    [PitcherName.AMDF]: mapPitcher((0, pitchfinder_1.AMDF)({ sampleRate: constants_1.SAMPLE_RATE }), PitcherName.AMDF),
    [PitcherName.YIN]: mapPitcher((0, pitchfinder_1.YIN)({ sampleRate: constants_1.SAMPLE_RATE }), PitcherName.YIN),
    [PitcherName.Macleod]: mapPitcher((0, pitchfinder_1.Macleod)({ sampleRate: constants_1.SAMPLE_RATE }), PitcherName.Macleod)
};
function isProbabalityPitch(pitch) {
    return Boolean(pitch) && typeof pitch !== 'number' && Boolean(pitch.probability);
}
function mapPitcher(pitcher, name) {
    return {
        detect: buffer => {
            const result = pitcher(buffer);
            if (isProbabalityPitch(result)) {
                return result.freq;
            }
            if (typeof result === 'number' && result <= 0) {
                return null;
            }
            return result;
        },
        name
    };
}
exports.mapPitcher = mapPitcher;
//# sourceMappingURL=shared.js.map