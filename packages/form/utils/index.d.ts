import { Form, FormValues } from '../types';
type MapFn<K, V> = Function extends (key: K, value: V) => infer R ? (key: K, value: V) => R : (key: K, value: V) => any;
type Predicate<K, V> = (key: K, value: V) => boolean;
export declare const map: <F extends Form<string>>(form: F, fn: (key: keyof F, value: F[keyof F]) => any) => {
    [k: string]: any;
};
export declare const filter: <F extends Form<string>>(form: F, predicate: Predicate<keyof F, F[keyof F]>) => F;
export declare const values: <F extends Form<string>>(form: F) => FormValues<F>;
export declare const hasErrors: <F extends Form<string>>(form: F) => boolean;
export declare const hasEmptyFields: <F extends Form<string>>(form: F) => boolean;
export {};
