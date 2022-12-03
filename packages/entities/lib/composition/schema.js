"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionSchema = exports.PatternSchema = exports.TactSchema = exports.CompositeUnitSchema = exports.SoundSchema = exports.UnitSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const shared_1 = require("../unit/shared");
exports.UnitSchema = zod_1.default.object({
    kind: zod_1.default.nativeEnum(shared_1.UnitKind),
    index: zod_1.default.number().gte(0)
});
exports.SoundSchema = exports.UnitSchema.extend({
    symbol: zod_1.default.string(),
    color: zod_1.default.string(),
    frequencies: zod_1.default.array(zod_1.default.number())
});
exports.CompositeUnitSchema = exports.UnitSchema.extend({
    children: zod_1.default.array(exports.SoundSchema)
});
exports.TactSchema = zod_1.default.object({
    index: zod_1.default.number(),
    units: zod_1.default.array(exports.UnitSchema)
});
exports.PatternSchema = zod_1.default.array(exports.TactSchema);
exports.CompositionSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string(),
    bpm: zod_1.default.number(),
    size: zod_1.default.number(),
    pattern: exports.PatternSchema
});
//# sourceMappingURL=schema.js.map