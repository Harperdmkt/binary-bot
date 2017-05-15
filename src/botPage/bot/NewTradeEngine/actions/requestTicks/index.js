import * as actions from '../../constants/actions';

let tickListenerKey;

const requestTicks = symbol => (dispatch, getState, { ticksService }) => {
    const { initData: { symbol: currentSymbol } } = getState();
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
            const [{ epoch: lastTick }] = ticks.slice(-1);
            dispatch({ type: actions.NEW_TICK, lastTick });
        },
    });

    tickListenerKey = key;
};

export default requestTicks;
