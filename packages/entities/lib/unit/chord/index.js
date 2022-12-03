"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChord = void 0;
const frequency_1 = require("utils/frequency");
const common_1 = require("utils/common");
const tempo_1 = require("utils/tempo");
const shared_1 = require("../shared");
const isChord = (unit) => unit instanceof Chord;
exports.isChord = isChord;
class Chord {
    children;
    frequencies;
    kind = shared_1.UnitKind.Composite;
    type = shared_1.UnitType.Chord;
    constructor(children) {
        this.children = children;
        this.frequencies = this.children.flatMap(({ frequencies }) => frequencies);
    }
    async *play(bpm) {
        const interval = (0, tempo_1.bpmToMilliseconds)(bpm);
        yield this;
        await (0, common_1.sleep)(interval);
    }
    check(receivedFrequency) {
        return (0, frequency_1.areFrequenciesCorrect)(this.frequencies, receivedFrequency);
    }
}
exports.default = Chord;
//# sourceMappingURL=index.js.map