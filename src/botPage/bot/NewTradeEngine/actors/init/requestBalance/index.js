import { Map } from 'immutable';
import { doUntilDone } from '../../../../tools';
import * as actions from '../../../reducers/actions';

const requestBalance = token => (dispatch, getState, { api }) => {
    const authPromise = new Promise(resolve => api.events.on('authorize', resolve));

    api.events.on('balance', r => {
        const { balance: { balance: b, currency } } = r;

        const data = new Map({ balance: Number(b).toFixed(2), currency });
        dispatch({ type: actions.BALANCE_RECEIVED, data });
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

export default requestBalance;
