import { FormEntry, Form, FormValues } from './types'

type MapFn<K, V> = Function extends (key: K, value: V) => infer R
  ? (key: K, value: V) => R
  : (key: K, value: V) => any

type Predicate<K, V> = (key: K, value: V) => boolean

export const map = <F extends Form>(
  form: F,
  fn: MapFn<keyof F, F[keyof F]>
) => Object.fromEntries(
  Object.entries(form)
    .map(([key, value]) => [key, fn(key as keyof F, value as F[keyof F])])
)

export const filter = <F extends Form>(
  form: F,
  predicate: Predicate<keyof F, F[keyof F]>
) => Object.fromEntries(
  Object.entries(form)
    .filter(([key, value]) => predicate(key, value as F[keyof F]))
) as F

export const values = <F extends Form>(
  form: F
) => Object.fromEntries(
  Object.entries(form).map(([key, { value }]) => [key, value])
) as FormValues<F>
