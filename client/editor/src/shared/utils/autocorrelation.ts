
export function findFundamentalFrequency(buffer: Float32Array, sampleRate: number) {
    // Мы будем использовать автокорреляцию для поиска основной частоты

    // Для корреляции сигнала самим собой (отсюда и название алгоритма), мы проверим две точки на расстоянии k. 
    // Индекс автокорреляции будет средним значением для этих сумм. At the same time, we normalize the values.
    // Источник: http://www.phy.mty.edu/~suits/autocorrelation.html
    // Предполагая, что частота дискредизации составляет 48000Hz, значение 'k' равное 1000 будет соответствовать сигналу в 48Hz (48000/1000 = 48), 
    // в то время как 'k' равное 8 будет соответствовать 6000Hz, чего более чем достаточно для покрытия большей части частот (если не всех) 
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (let i = 0; i < SIZE; i++) {
        let val = buffer[i];
        sumOfSquares += val * val;
    }
    let rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
    if (rootMeanSquare < 0.01) {
        return -1;
    }

    // Find a range in the buffer where the values are below a given threshold.
    let r1 = 0;
    let r2 = SIZE - 1;
    let threshold = 0.2;

    // Walk up for r1
    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i;
            break;
        }
    }

    // Walk down for r2
    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i;
            break;
        }
    }

    // Trim the buffer to these ranges and update SIZE.
    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length

    // Create a new array of the sums of offsets to do the autocorrelation
    let c = new Array(SIZE).fill(0);
    // For each potential offset, calculate the sum of each buffer value times its offset value
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            c[i] = c[i] + buffer[j] * buffer[j + i]
        }
    }

    // Find the last index where that value is greater than the next one (the dip)
    let d = 0;
    while (c[d] > c[d + 1]) {
        d++;
    }

    // Iterate from that index through the end and find the maximum sum
    let maxValue = -1;
    let maxIndex = -1;
    for (let i = d; i < SIZE; i++) {
        if (c[i] > maxValue) {
            maxValue = c[i];
            maxIndex = i;
        }
    }

    let T0 = maxIndex;

    let x1 = c[T0 - 1];
    let x2 = c[T0];
    let x3 = c[T0 + 1]

    let a = (x1 + x3 - 2 * x2) / 2;
    let b = (x3 - x1) / 2
    if (a) {
        T0 = T0 - b / (2 * a);
    }

    return sampleRate / T0;
}
