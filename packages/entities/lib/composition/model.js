"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Composition {
    id;
    name;
    pattern;
    bpm;
    size;
    iterator = null;
    listeners = [];
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.pattern = config.pattern;
        this.bpm = config.bpm;
        this.size = config.size;
    }
    async play(bpm = this.bpm) {
        this.iterator = this.transition(bpm);
        for await (const state of this.iterator) {
            this.listeners.forEach(onUpdate => onUpdate?.(state));
        }
        this.iterator = null;
        return this;
    }
    async stop() {
        await this.iterator?.return(null);
        this.iterator = null;
        return this;
    }
    subscribe(listener) {
        this.listeners = [...this.listeners, listener];
        return this;
    }
    unsubscribe() {
        this.listeners = [];
        return this;
    }
    stringify() {
        return JSON.stringify({
            id: this.id,
            bpm: this.bpm,
            name: this.name,
            pattern: this.pattern,
            size: this.size
        });
    }
    async *transition(bpm) {
        for (const [tactIndex, tact] of this.pattern.entries()) {
            for (const [unitIndex, unit] of tact.units.entries()) {
                const beats = unit.play(bpm);
                for await (const beat of beats) {
                    yield {
                        beat: { ...beat, index: unitIndex },
                        tact: { ...tact, index: tactIndex }
                    };
                }
            }
        }
    }
}
exports.default = Composition;
//# sourceMappingURL=model.js.map