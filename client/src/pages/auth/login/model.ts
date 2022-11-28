import { sample } from 'effector';
import { createForm } from '~/shared/form';
import { createValidator } from '~/shared/form/validators';
import * as regexp from '~/shared/regexp'

const errorMessages = {
  email: 'Must be an email',
  password: 'Must contain minimum 8 characters, 1 letter and 1 number',
}

export const form = createForm({
  email: createValidator(regexp.email, errorMessages.email),
  password: createValidator(regexp.password, errorMessages.password),
})
