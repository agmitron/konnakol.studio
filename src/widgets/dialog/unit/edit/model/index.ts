import { combine, createEvent, createStore, sample, UnitValue } from 'effector';
import { instantiatePopup } from '~/widgets/dialog/unit/shared/popup'
import { flatFrequencies, instantiateUnitForm } from '~/widgets/dialog/unit/shared/form'
import { $units } from '~/entities/user/model';
import Note from '~/entities/unit/note/model';
import { reset } from 'patronum';
import { NonNullableStructure } from '~/shared/utils/types.utils';

export const saved = createEvent()
export const unitChosen = createEvent<number>()

export const popup = instantiatePopup()
export const form = instantiateUnitForm()

export const $index = createStore<number | null>(null)
export const $source = combine({ index: $index, units: $units })


sample({
  clock: unitChosen,
  target: $index
})

sample({
  clock: [$index, $units],
  source: $source,
  filter: (source): source is NonNullableStructure<UnitValue<typeof $source>> => source.index !== null,
  fn: ({ index, units }) => {
    if (index === null) {
      throw new Error(`Invalid index: ${index}`)
    }

    const unit = units.at(index)

    if (!unit) {
      throw new Error(`Unit with index ${index} was not found`)
    }

    const frequencies = flatFrequencies(unit.frequencies)

    return {
      symbol: unit.symbol,
      ...frequencies
    }
  },
  target: form.update
})

sample({
  clock: unitChosen,
  target: popup.open
})

sample({
  clock: saved,
  source: { units: $units, form: form.$store, frequencies: form.frequencies.$store, index: $index },
  fn: ({ units, form, frequencies, index }) => units.map(
    (oldUnit, i) => index === i
      ? new Note({
        frequencies: frequencies.map(([_, { value }]) => Number(value)),
        symbol: form.symbol.value
      })
      : oldUnit
  ),
  target: $units
})

sample({
  clock: saved,
  target: popup.close
})

reset({
  clock: popup.close,
  target: [form.$store, $index]
})
