import { Map } from 'immutable';
import * as constants from '../../constants';

const actIfInStage = (dispatch, getState, $scope, expectedStage, type) => {
    const { stage: { name: stage } } = getState();
    if (stage === expectedStage) {
        dispatch({ type });
    }
};

export const init = data => (dispatch, getState) => {
    const { stage: { name: stage }, balance, tickSignal } = getState();
    if (stage === constants.STOP && balance.get('balance') && tickSignal) {
        dispatch({ type: constants.INITIALIZE, data: new Map(data) });
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
