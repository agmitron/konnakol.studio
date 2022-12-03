import { createEvent, sample } from 'effector';
import { instantiatePopup } from "~/widgets/tool/sounds/dialog/unit/shared/popup";
import { instantiateUnitForm } from "~/widgets/tool/sounds/dialog/unit/shared/form";
import { $sounds, soundCreated } from '~/entities/user/model';
import Sound from '~/entities/unit/sound/model';
import { reset } from 'patronum';

export const created = createEvent()

export const popup = instantiatePopup();
export const form = instantiateUnitForm();

sample({
  clock: created,
  source: { form: form.$store, frequencies: form.frequencies.$store },
  fn: ({ form, frequencies }) =>
    new Sound({
      symbol: form.symbol.value,
      frequencies: frequencies.map(([_, { value }]) => Number(value)),
    }),
  target: soundCreated
})

sample({
  clock: created,
  target: popup.close
})

reset({
  clock: popup.close,
  target: [form.$store]
})
