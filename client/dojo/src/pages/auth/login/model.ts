import { createEvent, sample } from 'effector';
import { loginFx } from '~/entities/user/api';
import { createForm } from '~/shared/form';
import { values } from '~/shared/form/utils';
import { createValidator } from '~/shared/form/validators';
import * as regexp from '~/shared/regexp'

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
