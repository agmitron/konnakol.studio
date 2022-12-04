"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
__exportStar(require("./api"), exports);
//# sourceMappingURL=index.js.map