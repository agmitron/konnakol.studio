import { combine, createEvent, createStore, sample } from 'effector';
import { $soundsAsMapping } from '~/entities/user/model';
import parseKonnakol from '../lib/parser';

export const $konnakol = createStore('');

export const $composition = combine(
  $soundsAsMapping,
  $konnakol,
  parseKonnakol
)

export const konnakolChanged = createEvent<string>()

sample({
  clock: konnakolChanged,
  target: $konnakol
})



