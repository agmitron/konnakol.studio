export type NonNullableStructure<T> = {
  [P in keyof T]: NonNullable<T[P]>
};

export interface Selectable {
  selected?: boolean;
}

export class Indexed<T> {
  constructor(public readonly index: number, public readonly value: T) { }
}
