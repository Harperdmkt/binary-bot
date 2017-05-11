import { Map } from 'immutable';
import { doUntilDone } from '../../../tools';
import * as constants from '../../constants';

export const balance = token => (dispatch, getState, { api }) => {
    const authPromise = new Promise(resolve => api.events.on('authorize', resolve));

    api.events.on('balance', r => {
        const { balance: { balance: b, currency } } = r;

        const data = new Map({ balance: Number(b).toFixed(2), currency });
        dispatch({ type: constants.BALANCE_RECEIVED, data });
    });

    doUntilDone(() => api.authorize(token)).catch(e => {
        throw e;
    });

    authPromise.then(() =>
        doUntilDone(() => api.subscribeToBalance()).catch(e => {
            throw e;
        })
    );
};

let tickListenerKey;
let currentSymbol;

export const tick = symbol => (dispatch, getState, { ticksService }) => {
    if (!symbol || currentSymbol === symbol) {
        return;
    }

    ticksService.stopMonitor({
        symbol: currentSymbol,
        key   : tickListenerKey,
    });

    const key = ticksService.monitor({
        symbol,
        callback() {
            dispatch({ type: constants.TICK_SIGNAL, data: new Date().getTime() });
        },
    });

    currentSymbol = symbol;

    tickListenerKey = key;
};
