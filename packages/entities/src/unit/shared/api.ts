import { createEffect } from 'effector';
import Sound from '../sound';

export const createSoundFx = createEffect(async (sound: Sound) => sound)
