// Const
const LF          = 0x0A;
const CR          = 0x0D;
const CRLF_LENGTH = 2;

export const CRLF = new Buffer([CR, LF]);

// API
export function createLineIterator (buffer) {
    return {
        [Symbol.iterator]: function* () {
            const lastIdx = buffer.length - 1;
            let start     = 0;

            for (let i = 0; i < buffer.length; i++) {
                if (i === lastIdx)
                    yield buffer.slice(start);

                else if (buffer[i] === CR && buffer[i + 1] === LF) {
                    yield buffer.slice(start, i);
                    start = i + CRLF_LENGTH;
                }
            }
        }
    };
}

export function appendLine (lines, line) {
    if (lines.length)
        lines.push(CRLF);

    lines.push(line);
}

export function equals (buffer1, buffer2) {
    if (buffer1.length !== buffer2.length)
        return false;

    for (let i = 0; i < buffer1.length; i++) {
        if (buffer1[i] !== buffer2[i])
            return false;
    }

    return true;
}
