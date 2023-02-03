"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areFrequenciesCorrect = exports.isFrequencyCorrect = void 0;
const constants_1 = require("../constants");
const isFrequencyCorrect = (expected, received) => {
    return received <= expected + constants_1.FREQUENCY_DEVIATION && received >= expected - constants_1.FREQUENCY_DEVIATION;
};
exports.isFrequencyCorrect = isFrequencyCorrect;
const areFrequenciesCorrect = (possibleFrequencies, received) => possibleFrequencies.some(freq => freq === received);
exports.areFrequenciesCorrect = areFrequenciesCorrect;
//# sourceMappingURL=index.js.map