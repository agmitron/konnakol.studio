import { createEvent, sample } from 'effector';
import { instantiatePopup } from "~/widgets/tool/sounds/dialog/unit/shared/popup";
import { instantiateUnitForm } from "~/widgets/tool/sounds/dialog/unit/shared/form";
import { $units } from '~/entities/user/model';
import Note from '~/entities/unit/note/model';
import { reset } from 'patronum';

export const created = createEvent()

export const popup = instantiatePopup();
export const form = instantiateUnitForm();

sample({
  clock: created,
  source: { units: $units, form: form.$store, frequencies: form.frequencies.$store },
  fn: ({ units, form, frequencies }) => ([
    ...units,
    new Note({
      symbol: form.symbol.value,
      frequencies: frequencies.map(([_, { value }]) => Number(value)),
    })
  ]),
  target: $units
})

sample({
  clock: created,
  target: popup.close
})

reset({
  clock: popup.close,
  target: [form.$store]
})
