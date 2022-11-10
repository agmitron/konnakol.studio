import { createEffect } from 'effector';
import { SingleUnit } from '~/entities/unit/model';

export const createUnitFx = createEffect(async (unit: SingleUnit) => unit)
