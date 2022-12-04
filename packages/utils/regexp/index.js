"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.password = exports.email = exports.numerical = exports.anyString = void 0;
const anyString = () => true;
exports.anyString = anyString;
const numerical = (value) => /\d/g.test(value);
exports.numerical = numerical;
const email = (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
exports.email = email;
const password = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
exports.password = password;
//# sourceMappingURL=index.js.map