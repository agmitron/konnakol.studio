const ONE_MINUTE = 60_000;

export function bpmToMilliseconds(bpm: number) {
  return ONE_MINUTE / bpm;
}

export function millisecondsToBPM(ms: number) {
  return ONE_MINUTE / ms;
}

export async function tick(count: number = 1, tempo: number) {
  const tickSound = new Audio('/tick.mp3');

  let playedTimes = 1;
  tickSound.play();

  return new Promise<void>(resolve => {
    const interval = window.setInterval(async () => {
      if (playedTimes >= count) {
        clearInterval(interval)
        return resolve();
      }

      await tickSound.play();
      playedTimes++;
    }, tempo)
  })
}