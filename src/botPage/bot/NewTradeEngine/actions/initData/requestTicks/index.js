import * as actions from '../../../reducers/actions';

let tickListenerKey;

const requestTicks = symbol => (dispatch, getState, { ticksService }) => {
    const { initData: { symbol: currentSymbol } } = getState();
    if (!symbol || currentSymbol === symbol) {
        return Promise.resolve();
    }

    ticksService.stopMonitor({
        symbol: currentSymbol,
        key   : tickListenerKey,
    });

    return new Promise(resolve => {
        const key = ticksService.monitor({
            symbol,
            callback(ticks) {
                const [{ epoch: data }] = ticks.slice(-1);
                dispatch({ type: actions.TICK_SIGNAL, data });
                resolve();
            },
        });

        tickListenerKey = key;
    });
};

export default requestTicks;
