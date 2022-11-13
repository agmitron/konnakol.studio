import { createEffect } from 'effector';
import Sound from '../sound/model';

export const createSoundFx = createEffect(async (sound: Sound) => sound)
