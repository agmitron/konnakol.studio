"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const createValidator = (predicate, errorMessage) => (value) => predicate(value) ? '' : errorMessage;
exports.createValidator = createValidator;
function validate(values, schema) {
    const validated = Object
        .entries(values)
        .map(([key, value]) => {
        const field = key;
        const validator = schema[field];
        const error = value && validator ? validator(value) : '';
        return [field, { value, error }];
    });
    return Object.fromEntries(validated);
}
exports.default = validate;
//# sourceMappingURL=index.js.map