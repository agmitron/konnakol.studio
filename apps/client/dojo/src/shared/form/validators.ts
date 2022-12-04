import { Field, Form, FormEntry, Predicate, Validator, Value, Error} from './types'

export const createValidator = (
  predicate: Predicate, errorMessage: Error
) => (value: Value) => predicate(value) ? '' : errorMessage

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
