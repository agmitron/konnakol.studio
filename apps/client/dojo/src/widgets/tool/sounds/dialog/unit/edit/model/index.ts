import { combine, createEvent, createStore, sample, UnitValue } from 'effector';
import { instantiatePopup } from '~/widgets/tool/sounds/dialog/unit/shared/popup'
import { flatFrequencies, instantiateUnitForm } from '~/widgets/tool/sounds/dialog/unit/shared/form'
import { $sounds, Sound } from 'entities';
import { reset } from 'patronum';
import { NonNullableStructure } from 'utils/types';

export const saved = createEvent()
export const unitChosen = createEvent<number>()

export const popup = instantiatePopup()
export const form = instantiateUnitForm()

export const $index = createStore<number | null>(null)
export const $source = combine({ index: $index, units: $sounds })


sample({
  clock: unitChosen,
  target: $index
})

sample({
  clock: [$index, $sounds],
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
  source: { units: $sounds, form: form.$store, frequencies: form.frequencies.$store, index: $index },
  fn: ({ units, form, frequencies, index }) => units.map(
    (oldUnit, i) => index === i
      ? new Sound({
        frequencies: frequencies.map(([_, { value }]) => Number(value)),
        symbol: form.symbol.value
      })
      : oldUnit
  ),
  target: $sounds
})

sample({
  clock: saved,
  target: popup.close
})

reset({
  clock: popup.close,
  target: [form.$store, $index]
})
