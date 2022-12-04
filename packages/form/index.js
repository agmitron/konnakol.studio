"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const effector_1 = require("effector");
const utils_1 = require("./utils");
const validators_1 = __importDefault(require("./validators"));
function createForm(schema) {
    const update = (0, effector_1.createEvent)();
    const $store = (0, effector_1.createStore)(Object.fromEntries(Object.entries(schema).map(([field]) => [field, { value: '', error: '' }])));
    $store
        .on(update, (prev, updates) => (0, validators_1.default)({ ...(0, utils_1.values)(prev), ...updates }, schema));
    return {
        $store,
        update
    };
}
exports.createForm = createForm;
//# sourceMappingURL=index.js.map