import { createEvent, sample } from 'effector';
import { loginFx } from 'entities';
import { createForm } from 'form';
import { values } from 'form/utils';
import { createValidator } from 'form/validators';
import * as regexp from 'utils/regexp'

export const form = createForm({
  email: createValidator(regexp.anyString, ''),
  password: createValidator(regexp.anyString, ''),
})

export const formSubmitted = createEvent()

sample({
  clock: formSubmitted,
  source: form.$store,
  fn: form => values(form),
  target: loginFx
})
