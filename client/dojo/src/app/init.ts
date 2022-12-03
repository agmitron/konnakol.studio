import axios from 'axios'
import { ApiError } from './api'

axios.interceptors.response.use(r => r, error => Promise.reject(error.response.data as ApiError))
