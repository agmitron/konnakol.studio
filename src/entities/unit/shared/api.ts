import { createEffect } from 'effector';
import { SingleUnit } from '~/entities/unit/shared';

export const createUnitFx = createEffect(async (unit: SingleUnit) => unit)
