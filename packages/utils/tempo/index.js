"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tick = exports.millisecondsToBPM = exports.bpmToMilliseconds = void 0;
const ONE_MINUTE = 60000;
function bpmToMilliseconds(bpm) {
    return ONE_MINUTE / bpm;
}
exports.bpmToMilliseconds = bpmToMilliseconds;
function millisecondsToBPM(ms) {
    return ONE_MINUTE / ms;
}
exports.millisecondsToBPM = millisecondsToBPM;
async function tick(count = 1, tempo) {
    const tickSound = new Audio('/tick.mp3');
    let playedTimes = 1;
    tickSound.play();
    return new Promise(resolve => {
        const interval = window.setInterval(async () => {
            if (playedTimes >= count) {
                clearInterval(interval);
                return resolve();
            }
            await tickSound.play();
            playedTimes++;
        }, tempo);
    });
}
exports.tick = tick;
//# sourceMappingURL=index.js.map