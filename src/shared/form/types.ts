export type Field = string
export type Value = string
export type Error = string
export type FormEntry = {
  value: Value
  error: Error
}

export type Validator = (value: Value) => Error

export type Form<F extends Field = Field> = {
  [field in F]: FormEntry
}

export type FormValues<F extends Form> = Record<keyof F, F[keyof F]['value']>
export type FormErrors<F extends Form> = Record<keyof F, F[keyof F]['error']>
