import { createEvent, createStore } from 'effector';
import { Field, Validator, Form, FormValues } from './types';
import { values } from './utils';
import validate from './validators';

export function createForm<F extends Field = Field>(
  schema: Record<F, Validator>
) {
  type Updates = FormValues<Form<F>>

  const update = createEvent<Partial<Updates>>()

  const $store = createStore<Form<F>>(
    Object.fromEntries(
      Object.entries(schema).map(([field]) => [field, { value: '', error: '' }])
    ) as Form<F>
  )

  $store
    .on(update, (prev, updates) => validate({ ...values(prev), ...updates }, schema))

  return {
    $store,
    update,
  }
}
