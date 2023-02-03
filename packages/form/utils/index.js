"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasEmptyFields = exports.hasErrors = exports.values = exports.filter = exports.map = void 0;
const map = (form, fn) => Object.fromEntries(Object.entries(form)
    .map(([key, value]) => [key, fn(key, value)]));
exports.map = map;
const filter = (form, predicate) => Object.fromEntries(Object.entries(form)
    .filter(([key, value]) => predicate(key, value)));
exports.filter = filter;
const values = (form) => Object.fromEntries(Object.entries(form).map(([key, { value }]) => [key, value]));
exports.values = values;
const hasErrors = (form) => Object.entries(form).some(([, { error }]) => !!error);
exports.hasErrors = hasErrors;
const hasEmptyFields = (form) => Object.entries(form).some(([, { value }]) => value === '');
exports.hasEmptyFields = hasEmptyFields;
//# sourceMappingURL=index.js.map