import { Field, Validator, Form, FormValues } from './types';
export declare function createForm<F extends Field = Field>(schema: Record<F, Validator>): {
    $store: import("effector").Store<Form<F>>;
    update: import("effector").Event<Partial<FormValues<Form<F>>>>;
};
