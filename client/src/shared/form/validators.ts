import { Field, Form, FormEntry, Validator, Value } from './types'

export const anyString = () => ''
export const numerical = (value: Value) => /\d/g.test(value) ? '' : 'Must be a number'

export default function validate<F extends Field>(
  values: Record<F, string>,
  schema: Record<F, Validator>
) {
  const validated = Object
    .entries<string>(values)
    .map<[F, FormEntry]>(([key, value]) => {
      const field = key as F
      const validator = schema[field]
      const error = value && validator ? validator(value) : ''

      return [field, { value, error }]
    })

  return Object.fromEntries(validated) as Form<F>
}
