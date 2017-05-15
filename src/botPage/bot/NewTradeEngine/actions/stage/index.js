import * as actions from '../../reducers/actions';
import * as states from '../../reducers/states';

const actIfInStage = (dispatch, getState, $scope, expectedStage, type) => {
    const { stage } = getState();
    if (stage === expectedStage) {
        dispatch({ type });
    }
};

export const start = () => (...args) => actIfInStage(...args, states.INITIALIZED, actions.START);
export const proposalsReceived = () => (...args) => actIfInStage(...args, states.STARTED, actions.PROPOSALS_RECEIVED);
export const purchaseSucceeded = () => (...args) =>
    actIfInStage(...args, states.PROPOSALS_READY, actions.PURCHASE_SUCCEEDED);
export const purchaseFailed = () => (...args) => actIfInStage(...args, states.PROPOSALS_READY, actions.PURCHASE_FAILED);
export const openContractReceived = () => (...args) =>
    actIfInStage(...args, states.SUCCESSFUL_PURCHASE, actions.OPEN_CONTRACT_RECEIVED);
export const sellSucceeded = () => (...args) => actIfInStage(...args, states.OPEN_CONTRACT, actions.SELL_SUCCEEDED);
