export declare type NonNullableStructure<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
export interface Selectable {
    selected?: boolean;
}
export interface Indexed<I = number> {
    index: I;
}
export declare type ToolbarUnitIndex = number;
export declare type FrequencyIndex = number;
