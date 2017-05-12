import * as actions from '../../../reducers/actions';

let tickListenerKey;
let currentSymbol;

const requestTicks = symbol => (dispatch, getState, { ticksService }) => {
    if (!symbol || currentSymbol === symbol) {
        return;
    }

    ticksService.stopMonitor({
        symbol: currentSymbol,
        key   : tickListenerKey,
    });

    const key = ticksService.monitor({
        symbol,
        callback(ticks) {
            const [{ epoch: data }] = ticks.slice(-1);
            dispatch({ type: actions.TICK_SIGNAL, data });
        },
    });

    currentSymbol = symbol;

    tickListenerKey = key;
};

export default requestTicks;
