"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundCreated = exports.soundDeleted = exports.$soundsAsMapping = exports.$sounds = void 0;
const effector_1 = require("effector");
exports.$sounds = (0, effector_1.createStore)([]);
exports.$soundsAsMapping = exports.$sounds.map(units => units.reduce((acc, u) => ({ ...acc, [u.shortcut]: u }), {}));
exports.soundDeleted = (0, effector_1.createEvent)();
exports.soundCreated = (0, effector_1.createEvent)();
// sample({
//   clock: soundCreated,
//   target: createSoundFx
// })
// sample({
//   clock: createSoundFx.doneData,
//   source: $sounds,
//   fn: (units, newUnit) => [...units, newUnit],
//   target: $sounds
// })
(0, effector_1.sample)({
    clock: exports.soundDeleted,
    source: exports.$sounds,
    fn: (units, index) => units.filter((_, i) => i !== index),
    target: exports.$sounds
});
//# sourceMappingURL=index.js.map