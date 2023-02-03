export type NonNullableStructure<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
export interface Selectable {
    selected?: boolean;
}
export declare class Indexed<T> {
    readonly index: number;
    readonly value: T;
    constructor(index: number, value: T);
}
export type ToolbarUnitIndex = number;
export type FrequencyIndex = number;
