import z from 'zod';
import { UnitKind } from '../unit/shared';
export declare const UnitSchema: z.ZodObject<{
    kind: z.ZodNativeEnum<typeof UnitKind>;
    index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    kind: UnitKind;
    index: number;
}, {
    kind: UnitKind;
    index: number;
}>;
export declare const SoundSchema: z.ZodObject<z.extendShape<{
    kind: z.ZodNativeEnum<typeof UnitKind>;
    index: z.ZodNumber;
}, {
    symbol: z.ZodString;
    color: z.ZodString;
    frequencies: z.ZodArray<z.ZodNumber, "many">;
}>, "strip", z.ZodTypeAny, {
    symbol: string;
    color: string;
    kind: UnitKind;
    index: number;
    frequencies: number[];
}, {
    symbol: string;
    color: string;
    kind: UnitKind;
    index: number;
    frequencies: number[];
}>;
export declare const CompositeUnitSchema: z.ZodObject<z.extendShape<{
    kind: z.ZodNativeEnum<typeof UnitKind>;
    index: z.ZodNumber;
}, {
    children: z.ZodArray<z.ZodObject<z.extendShape<{
        kind: z.ZodNativeEnum<typeof UnitKind>;
        index: z.ZodNumber;
    }, {
        symbol: z.ZodString;
        color: z.ZodString;
        frequencies: z.ZodArray<z.ZodNumber, "many">;
    }>, "strip", z.ZodTypeAny, {
        symbol: string;
        color: string;
        kind: UnitKind;
        index: number;
        frequencies: number[];
    }, {
        symbol: string;
        color: string;
        kind: UnitKind;
        index: number;
        frequencies: number[];
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    children: {
        symbol: string;
        color: string;
        kind: UnitKind;
        index: number;
        frequencies: number[];
    }[];
    kind: UnitKind;
    index: number;
}, {
    children: {
        symbol: string;
        color: string;
        kind: UnitKind;
        index: number;
        frequencies: number[];
    }[];
    kind: UnitKind;
    index: number;
}>;
export declare const TactSchema: z.ZodObject<{
    index: z.ZodNumber;
    units: z.ZodArray<z.ZodObject<{
        kind: z.ZodNativeEnum<typeof UnitKind>;
        index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        kind: UnitKind;
        index: number;
    }, {
        kind: UnitKind;
        index: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    index: number;
    units: {
        kind: UnitKind;
        index: number;
    }[];
}, {
    index: number;
    units: {
        kind: UnitKind;
        index: number;
    }[];
}>;
export declare const PatternSchema: z.ZodArray<z.ZodObject<{
    index: z.ZodNumber;
    units: z.ZodArray<z.ZodObject<{
        kind: z.ZodNativeEnum<typeof UnitKind>;
        index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        kind: UnitKind;
        index: number;
    }, {
        kind: UnitKind;
        index: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    index: number;
    units: {
        kind: UnitKind;
        index: number;
    }[];
}, {
    index: number;
    units: {
        kind: UnitKind;
        index: number;
    }[];
}>, "many">;
export declare const CompositionSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    bpm: z.ZodNumber;
    size: z.ZodNumber;
    pattern: z.ZodArray<z.ZodObject<{
        index: z.ZodNumber;
        units: z.ZodArray<z.ZodObject<{
            kind: z.ZodNativeEnum<typeof UnitKind>;
            index: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            kind: UnitKind;
            index: number;
        }, {
            kind: UnitKind;
            index: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        index: number;
        units: {
            kind: UnitKind;
            index: number;
        }[];
    }, {
        index: number;
        units: {
            kind: UnitKind;
            index: number;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    bpm: number;
    size: number;
    pattern: {
        index: number;
        units: {
            kind: UnitKind;
            index: number;
        }[];
    }[];
}, {
    id: number;
    name: string;
    bpm: number;
    size: number;
    pattern: {
        index: number;
        units: {
            kind: UnitKind;
            index: number;
        }[];
    }[];
}>;
