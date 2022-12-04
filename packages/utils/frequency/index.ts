import { FREQUENCY_DEVIATION } from '../constants';

export type Frequency = number;

export const isFrequencyCorrect = (expected: number, received: number) => {
  return received <= expected + FREQUENCY_DEVIATION && received >= expected - FREQUENCY_DEVIATION;
};

export const areFrequenciesCorrect = (
  possibleFrequencies: Frequency[], received: Frequency
) => possibleFrequencies.some(freq => freq === received)