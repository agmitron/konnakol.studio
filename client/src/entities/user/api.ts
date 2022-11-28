import axios from 'axios'
import { createEffect } from 'effector';

interface Credentials {
  email: string;
  name: string;
  password: string;
}

export const registerFx = createEffect((body: Credentials) => axios.post('/auth/register', body))
export const loginFx = createEffect((body: Credentials) => axios.post('/auth/login', body))

