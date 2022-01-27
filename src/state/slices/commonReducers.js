export const commonReducers = (type, defaultTime) => {
    return {
        ["increment" + type]: (state) => {
            let minutes = parseInt(state[0].substring(0, 2));
            ++minutes;
            if (minutes < 10) minutes = "0" + minutes;
            return [minutes + state[0].substring(2, state[0].length), minutes + state[0].substring(2, state[0].length)];
        },
        ["decrement" + type]: (state) => {
            let minutes = parseInt(state[0].substring(0, 2));
            --minutes;
            if (minutes < 10) minutes = "0" + minutes;
            return [minutes + state[0].substring(2, state[0].length), minutes + state[0].substring(2, state[0].length)];
        },
        ["restart" + type]: (state) => {
            return [state[0], state[0]];
        },
        ["reset" + type]: () => defaultTime,
        ["time" + type]: (state) => {
            let seconds = parseInt(state[1].substring(3, state[0].length));
            let minutes = parseInt(state[1].substring(0, 2));
            if (seconds === 0) {
                --minutes;
                seconds = 59;
            } else {
                --seconds;
            }
            if (seconds === 0) seconds = "00";
            else if (seconds < 10) seconds = "0" + seconds;
            if (minutes === 0) minutes = "00";
            else if (minutes < 10) minutes = "0" + minutes;
            return [state[0], minutes + ":" + seconds]
        }
    }
}