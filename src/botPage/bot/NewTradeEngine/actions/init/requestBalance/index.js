import { Map } from 'immutable';
import { doUntilDone } from '../../../../tools';
import * as actions from '../../../reducers/actions';

const requestBalance = token => (dispatch, getState, { api }) => {
    const { balance: { balance } } = getState();

    if (balance) {
        return Promise.resolve();
    }

    return new Promise(resolve => {
        const authPromise = new Promise(r => api.events.on('authorize', r));

        api.events.on('balance', r => {
            const { balance: { balance: b, currency } } = r;

            const data = new Map({ balance: Number(b).toFixed(2), currency });
            dispatch({ type: actions.BALANCE_RECEIVED, data });
            resolve();
        });

        doUntilDone(() => api.authorize(token)).catch(e => {
            throw e;
        });

        authPromise.then(() =>
            doUntilDone(() => api.subscribeToBalance()).catch(e => {
                throw e;
            })
        );
    });
};

export default requestBalance;
