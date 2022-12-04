import axios from 'axios'
import { createEffect } from 'effector';

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends Credentials {
  name: string;
}

export const registerFx = createEffect((body: RegisterCredentials) => axios.post('/auth/register', body))
export const loginFx = createEffect((body: Credentials) => axios.post('/auth/login', body))

