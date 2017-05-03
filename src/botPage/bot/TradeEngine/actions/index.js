import * as constants from '../constants';

const dispatchIfScopeIs = ({ dispatch, getState, data, stage }) => {
    const { signal: { stage: currentScope } } = getState();
    if (currentScope === stage) {
        dispatch(data);
    }
};

const dispatchIfScopeIsBeforePurchase = args => dispatchIfScopeIs({ ...args, stage: constants.BEFORE_PURCHASE });

export const start = () => (dispatch, getState) =>
    dispatchIfScopeIs({ dispatch, getState, data: { type: constants.START }, stage: constants.STOP });

const dispatchIfBeforePurchaseReady = args => {
    const { getState } = args;
    const { proposals: { proposalsReady: beforePurchaseReady } } = getState();
    if (beforePurchaseReady) {
        dispatchIfScopeIsBeforePurchase(args);
    }
};
export const purchaseSuccessful = () => (dispatch, getState) =>
    dispatchIfBeforePurchaseReady({ dispatch, getState, data: { type: constants.PURCHASE_SUCCESSFUL } });

export const openContractReceived = () => (dispatch, getState) => {
    const { signal: { stage: currentScope } } = getState();
    if (currentScope === constants.DURING_PURCHASE) {
        dispatch({ type: constants.OPEN_CONTRACT });
    }
    dispatchIfBeforePurchaseReady({ dispatch, getState, data: { type: constants.OPEN_CONTRACT } });
};

export const sell = () => (dispatch, getState) =>
    dispatchIfScopeIs({ dispatch, getState, data: { type: constants.SELL }, stage: constants.DURING_PURCHASE });
