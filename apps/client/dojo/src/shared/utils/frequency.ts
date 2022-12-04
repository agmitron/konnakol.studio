import { FREQUENCY_DEVIATION } from '~/shared/utils/constants';
import { Frequency } from '~/shared/types/fraction.types';

export const isFrequencyCorrect = (expected: number, received: number) => {
  return received <= expected + FREQUENCY_DEVIATION && received >= expected - FREQUENCY_DEVIATION;
};

export const areFrequenciesCorrect = (
  possibleFrequencies: Frequency[], received: Frequency
) => possibleFrequencies.some(freq => freq === received)