import * as constants from '../../constants';
import { requestTicks, requestBalance } from './requests';

const actIfInStage = (dispatch, getState, $scope, expectedStage, type) => {
    const { stage: { name: stage } } = getState();
    if (stage === expectedStage) {
        dispatch({ type });
    }
};

const makeTicksAndBalance = async (token, symbol, $scope) => {
    await requestTicks(symbol, $scope);
    return requestBalance(token, $scope);
};

export const init = (token, options) => (dispatch, getState, $scope) => {
    const { stage: { name: stage } } = getState();
    const { symbol } = options;
    if (stage === constants.STOP) {
        makeTicksAndBalance(token, symbol, $scope)
            .then(() => dispatch({ type: constants.INITIALIZE, data: { token, options } }))
            .catch(() => dispatch({ type: constants.ERROR_OCCURRED }));
    }
};
export const start = () => (...args) => actIfInStage(...args, constants.INITIALIZED, constants.START);
export const proposalsReceived = () => (...args) =>
    actIfInStage(...args, constants.STARTED, constants.PROPOSALS_RECEIVED);
export const purchaseSucceeded = () => (...args) =>
    actIfInStage(...args, constants.PROPOSALS_READY, constants.PURCHASE_SUCCEEDED);
export const purchaseFailed = () => (...args) =>
    actIfInStage(...args, constants.PROPOSALS_READY, constants.PURCHASE_FAILED);
export const openContractReceived = () => (...args) =>
    actIfInStage(...args, constants.SUCCESSFUL_PURCHASE, constants.OPEN_CONTRACT_RECEIVED);
export const sellSucceeded = () => (...args) =>
    actIfInStage(...args, constants.OPEN_CONTRACT, constants.SELL_SUCCEEDED);
