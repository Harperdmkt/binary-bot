import * as constants from '../../constants';

let tickListenerKey;
let currentSymbol;

const requestTicks = symbol => (dispatch, getState, $scope) => {
    if (symbol && currentSymbol !== symbol) {
        const { ticksService } = $scope;

        ticksService.stopMonitor({
            symbol: currentSymbol,
            key   : tickListenerKey,
        });

        const key = ticksService.monitor({
            symbol,
            callback() {
                dispatch({ type: constants.TICKS_RECEIVED });
            },
        });

        currentSymbol = symbol;

        tickListenerKey = key;
    }
};

export default requestTicks;
