import { doUntilDone } from '../../../tools';
import * as constants from '../../constants';

const errorOccurred = error => ({ type: constants.ERROR_OCCURRED, error });

const requestBalance = token => async (dispatch, getState, $scope) => {
    const { init: { balance: currentBalance } } = getState();

    if (currentBalance) {
        return;
    }

    const { api } = $scope;

    await doUntilDone(() => api.authorize(token)).catch(error => dispatch(errorOccurred(error)));

    api.events.on('balance', r => {
        const { balance: { balance: b, currency } } = r;

        dispatch({ type: constants.BALANCE_RECEIVED, balance: Number(b).toFixed(2), currency });
    });

    doUntilDone(() => api.subscribeToBalance()).catch(error => dispatch(errorOccurred(error)));
};

export default requestBalance;
