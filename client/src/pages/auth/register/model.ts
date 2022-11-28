import { createEvent, sample } from 'effector';
import { registerFx } from '~/entities/user/api';
import { createForm } from '~/shared/form';
import { filter, values } from '~/shared/form/utils';
import { createValidator } from '~/shared/form/validators';
import * as regexp from '~/shared/regexp'

const errorMessages = {
  email: 'Must be an email',
  password: 'Must contain minimum 8 characters, 1 letter and 1 number',
  repeat_password: 'Passwords are not the same'
}

export const form = createForm({
  email: createValidator(regexp.email, errorMessages.email),
  name: createValidator(regexp.anyString, ''),
  password: createValidator(regexp.password, errorMessages.password),
  repeat_password: createValidator(regexp.password, errorMessages.password),
})

export const formSubmitted = createEvent()

sample({
  clock: formSubmitted,
  source: form.$store,
  fn: form => values(filter(form, (key) => key !== 'repeat_password')),
  target: registerFx
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
