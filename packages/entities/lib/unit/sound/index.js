"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSound = void 0;
const frequency_1 = require("utils/frequency");
const common_1 = require("utils/common");
const tempo_1 = require("utils/tempo");
const shared_1 = require("../shared");
const isSound = (unit) => unit instanceof Sound;
exports.isSound = isSound;
class Sound {
    kind = shared_1.UnitKind.Single;
    type = shared_1.UnitType.Sound;
    frequencies;
    symbol;
    color;
    shortcut;
    constructor(config) {
        this.frequencies = config.frequencies;
        this.color = config.color ?? 'black';
        this.symbol = config.symbol;
        this.shortcut = config.shortcut || config.symbol;
    }
    async *play(bpm) {
        const interval = (0, tempo_1.bpmToMilliseconds)(bpm);
        yield this;
        await (0, common_1.sleep)(interval);
    }
    check(receivedFrequency) {
        const [expectedFrequency = null] = this.frequencies;
        if (!expectedFrequency) {
            return true;
        }
        return (0, frequency_1.isFrequencyCorrect)(expectedFrequency, receivedFrequency);
    }
}
exports.default = Sound;
//# sourceMappingURL=index.js.map