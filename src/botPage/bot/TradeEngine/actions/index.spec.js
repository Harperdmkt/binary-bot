import * as constants from '../constants';
import * as actions from './';
import { toBeCalledWith, notToBeCalled } from './tools';

const beforePurchase = {
    correctScope  : args => toBeCalledWith({ ...args, state: { signal: { stage: constants.BEFORE_PURCHASE } } }),
    incorrectScope: action => notToBeCalled({ action, state: { signal: { stage: constants.DURING_PURCHASE } } }),
    isReady       : args =>
        toBeCalledWith({
            ...args,
            state: { signal: { stage: constants.BEFORE_PURCHASE }, proposals: { proposalsReady: true } },
        }),
    isNotReady: action =>
        notToBeCalled({
            action,
            state: { signal: { stage: constants.BEFORE_PURCHASE }, proposals: { proposalsReady: false } },
        }),
};

describe('signal actions', () => {
    it('START is fired if the stage is STOP', () => {
        toBeCalledWith({
            action    : actions.start,
            calledWith: { type: constants.START },
            state     : { signal: { stage: constants.STOP } },
        });
    });
    it('START is not fired if the stage is not STOP', () => {
        notToBeCalled({ action: actions.start, state: { signal: { stage: constants.BEFORE_PURCHASE } } });
    });
    it('PURCHASE_SUCCESSFUL is fired if BEFORE_PURCHASE is ready', () => {
        beforePurchase.isReady({
            action    : actions.purchaseSuccessful,
            calledWith: { type: constants.PURCHASE_SUCCESSFUL },
        });
    });
    it('PURCHASE_SUCCESSFUL is not fired if BEFORE_PURCHASE is not ready', () => {
        beforePurchase.isNotReady(actions.purchaseSuccessful);
    });
    it('OPEN_CONTRACT is fired if BEFORE_PURCHASE is ready or stage is DURING_PURCHASE', () => {
        beforePurchase.isReady({ action: actions.openContractReceived, calledWith: { type: constants.OPEN_CONTRACT } });
        toBeCalledWith({
            action    : actions.openContractReceived,
            calledWith: { type: constants.OPEN_CONTRACT },
            state     : { signal: { stage: constants.DURING_PURCHASE, openContract: false }, proposals: {} },
        });
    });
    it('OPEN_CONTRACT is not fired if BEFORE_PURCHASE is not ready and stage is not DURING_PURCHASE', () => {
        beforePurchase.isNotReady(actions.openContractReceived);
        notToBeCalled({
            action: actions.openContractReceived,
            state : { signal: { stage: constants.STOP }, proposals: {} },
        });
    });
    it('SELL is fired if the stage is DURING_PURCHASE', () => {
        toBeCalledWith({
            action    : actions.sell,
            calledWith: { type: constants.SELL },
            state     : { signal: { stage: constants.DURING_PURCHASE, openContract: false } },
        });
    });
    it('SELL is not fired the stage is not DURING_PURCHASE', () => {
        notToBeCalled({ action: actions.sell, state: { signal: { stage: constants.STOP } } });
    });
});
