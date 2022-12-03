import { AlertColor } from '@mui/material';
import { createEvent, createStore, sample } from 'effector';
import { registerFx } from 'entities/user/api';
import { createForm } from 'form';
import { filter, values } from 'form/utils';
import { createValidator } from 'form/validators';
import * as regexp from 'utils/regexp'

type Snackbar = { severity: AlertColor; message: string }

const errorMessages = {
  email: 'Must be an email',
  password: 'Must contain minimum 8 characters, 1 letter and 1 number',
  repeat_password: 'Passwords are not the same'
}

const snackbars: Record<string, Snackbar> = {
  registered: {
    severity: 'success',
    message: 'You have been successfully registered. You will be redirected to the Login Page.'
  }
}

export const form = createForm({
  email: createValidator(regexp.email, errorMessages.email),
  name: createValidator(regexp.anyString, ''),
  password: createValidator(regexp.password, errorMessages.password),
  repeat_password: createValidator(regexp.password, errorMessages.password),
})

export const $snackbar = createStore<Snackbar | null>(null)
export const $shouldBeRedirectedToLoginPage = createStore(false)

export const formSubmitted = createEvent()
export const snackbarShown = createEvent<Snackbar>()
export const snackbarHidden = createEvent()

sample({
  clock: formSubmitted,
  source: form.$store,
  fn: form => values(filter(form, (key) => key !== 'repeat_password')),
  target: registerFx
})

sample({
  clock: registerFx.done,
  fn: () => snackbars.registered,
  target: snackbarShown
})

sample({
  clock: registerFx.failData,
  fn: ({ message }): Snackbar => ({ severity: 'error', message: message }),
  target: snackbarShown
})

sample({
  clock: snackbarHidden,
  source: $snackbar,
  filter: snackbar => snackbar === snackbars.registered,
  fn: () => true,
  target: $shouldBeRedirectedToLoginPage
})

sample({
  clock: snackbarShown,
  target: $snackbar
})

sample({
  clock: snackbarHidden,
  fn: () => null,
  target: $snackbar
})

sample({
  clock: form.$store,
  filter: ({ repeat_password, password }) => repeat_password.error !== errorMessages.repeat_password && password.value !== repeat_password.value,
  fn: (form) => ({
    ...form,
    repeat_password: { value: form.repeat_password.value, error: errorMessages.repeat_password }
  }),
  target: form.$store
})
