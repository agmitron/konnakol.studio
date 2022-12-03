"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoll = void 0;
const frequency_1 = require("utils/frequency");
const common_1 = require("utils/common");
const tempo_1 = require("utils/tempo");
const shared_1 = require("../shared");
const isRoll = (unit) => unit instanceof Roll;
exports.isRoll = isRoll;
class Roll {
    children;
    kind = shared_1.UnitKind.Composite;
    type = shared_1.UnitType.Roll;
    currentFraction = null;
    constructor(children) {
        this.children = children;
    }
    async *play(bpm) {
        const interval = (0, tempo_1.bpmToMilliseconds)(bpm) / this.children.length;
        for (const currentFraction of this.children) {
            this.currentFraction = currentFraction;
            yield this.currentFraction;
            await (0, common_1.sleep)(interval);
        }
    }
    check(receivedFrequency) {
        if (!this.currentFraction) {
            throw new Error('Roll is not being played now.');
        }
        return (0, frequency_1.areFrequenciesCorrect)(this.currentFraction.frequencies, receivedFrequency);
    }
}
exports.default = Roll;
//# sourceMappingURL=index.js.map