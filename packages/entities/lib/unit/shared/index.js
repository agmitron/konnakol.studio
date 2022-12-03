"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRenderable = exports.hasFrequencies = exports.UnitType = exports.UnitKind = void 0;
var UnitKind;
(function (UnitKind) {
    UnitKind["Composite"] = "composite";
    UnitKind["Single"] = "single";
})(UnitKind = exports.UnitKind || (exports.UnitKind = {}));
var UnitType;
(function (UnitType) {
    UnitType["Sound"] = "note";
    UnitType["Chord"] = "chord";
    UnitType["Roll"] = "roll";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
const hasFrequencies = (unit) => Boolean(unit.frequencies);
exports.hasFrequencies = hasFrequencies;
const isRenderable = (unit) => {
    const probablyRenderableUnit = unit;
    return Boolean(probablyRenderableUnit.symbol && probablyRenderableUnit.color);
};
exports.isRenderable = isRenderable;
//# sourceMappingURL=index.js.map