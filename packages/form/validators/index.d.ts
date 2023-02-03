import { Field, Form, Predicate, Validator, Value, Error } from '../types';
export declare const createValidator: (predicate: Predicate, errorMessage: Error) => (value: Value) => string;
export default function validate<F extends Field>(values: Record<F, string>, schema: Record<F, Validator>): Form<F>;
