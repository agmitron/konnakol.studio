import { createEvent, createStore, sample } from 'effector';
import { condition, empty, not } from 'patronum';
import { createForm } from 'form';
import { Form } from 'form/types';
import { filter } from 'form/utils';
import { createValidator } from 'form/validators';
import { $frequency, startListeningMicro, stopListeningMicro } from 'pitch';
import { anyString, numerical } from 'utils/regexp';
import { FrequencyIndex, Frequency } from 'utils/frequency';

type FrequencyKey = `frequency${FrequencyIndex}`
type FlatFrequencies = Record<FrequencyKey, Frequency>
type UnitFormField = 'symbol' | FrequencyKey

const makeFrequencyKey = (index: FrequencyIndex): FrequencyKey => `frequency${index}`

const reorderFrequencies = (
  form: Form<UnitFormField>
) => {
  const reordered = Object
    .entries(form)
    .sort()
    .map(([key, entry], index) => key.startsWith('frequency')
      ? [makeFrequencyKey(index), entry]
      : [key, entry]
    )

  return Object.fromEntries(reordered) as Form<UnitFormField>
}

export function instantiateUnitForm() {
  const form = createForm<UnitFormField>({
    symbol: createValidator(anyString, 'Must be a string'),
    frequency0: createValidator(numerical, 'Must be numerical')
  })

  const frequencies = {
    $store: form.$store.map(form => Object.entries(form)
      .filter(([key]) => key.startsWith('frequency'))
    ),
    $listening: createStore<string | null>(null),
    add: createEvent(),
    update: createEvent<[string, string]>(),
    remove: createEvent<string>(),
    pitch: createEvent<string>()
  }

  sample({
    clock: frequencies.add,
    source: frequencies.$store,
    fn: ({ length }) => ({ [makeFrequencyKey(length)]: '' }),
    target: form.update
  })

  sample({
    clock: frequencies.update,
    fn: ([name, value]) => ({ [name]: value }),
    target: form.update
  })

  sample({
    clock: frequencies.remove,
    source: form.$store,
    fn: (form, name) => reorderFrequencies(filter(form, (key) => key !== name)),
    target: form.$store
  })

  sample({
    clock: frequencies.pitch,
    source: frequencies.$listening,
    fn: (prevIndex, newIndex) => prevIndex === newIndex ? null : newIndex,
    target: frequencies.$listening
  })

  condition({
    source: frequencies.$listening,
    if: not(empty(frequencies.$listening)),
    then: startListeningMicro,
    else: stopListeningMicro
  })

  sample({
    clock: $frequency,
    source: frequencies.$listening,
    filter: (name: string | null): name is string => name !== null,
    fn: (name, frequency) => [name, frequency.toString()] as const,
    target: frequencies.update
  })

  return {
    ...form,
    frequencies
  }
}

export function flatFrequencies(frequencies: Frequency[]) {
  return frequencies.reduce<FlatFrequencies>(
    (acc, frequency, i) => ({ ...acc, [`frequency${i}`]: frequency }),
    {}
  )
}
