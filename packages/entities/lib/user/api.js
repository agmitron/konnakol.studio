"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFx = exports.registerFx = void 0;
const axios_1 = __importDefault(require("axios"));
const effector_1 = require("effector");
exports.registerFx = (0, effector_1.createEffect)((body) => axios_1.default.post('/auth/register', body));
exports.loginFx = (0, effector_1.createEffect)((body) => axios_1.default.post('/auth/login', body));
//# sourceMappingURL=api.js.map