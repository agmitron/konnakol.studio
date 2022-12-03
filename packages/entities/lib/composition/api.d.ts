export declare function loadComposition(id: number): Promise<{
    id: number;
    name: string;
    pattern: {
        index: number;
        units: ({
            index: number;
            kind: string;
            frequencies: number[];
            symbol: string;
            color: string;
            children?: undefined;
        } | {
            index: number;
            children: {
                index: number;
                kind: string;
                frequencies: number[];
                symbol: string;
                color: string;
            }[];
            frequencies: number[];
            kind: string;
            symbol?: undefined;
            color?: undefined;
        })[];
    }[];
    bpm: number;
    size: number;
    iterator: null;
    listeners: never[];
}>;
export declare const loadCompositionFx: import("effector").Effect<number, {
    id: number;
    name: string;
    pattern: {
        index: number;
        units: ({
            index: number;
            kind: string;
            frequencies: number[];
            symbol: string;
            color: string;
            children?: undefined;
        } | {
            index: number;
            children: {
                index: number;
                kind: string;
                frequencies: number[];
                symbol: string;
                color: string;
            }[];
            frequencies: number[];
            kind: string;
            symbol?: undefined;
            color?: undefined;
        })[];
    }[];
    bpm: number;
    size: number;
    iterator: null;
    listeners: never[];
}, Error>;
