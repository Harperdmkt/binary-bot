import * as states from '../../reducers/states';
import * as actions from '../../reducers/actions';
import { toBeCalledWith, notToBeCalled } from '../tools';
import * as stage from './';

describe('Stage actions', () => {
    it('Start if the state is initialized', () => {
        toBeCalledWith({
            action    : stage.start,
            state     : { stage: states.INITIALIZED },
            calledWith: { type: actions.START },
        });
    });
    it('Do not start if the state is already running', () => {
        notToBeCalled({
            action: stage.start,
            state : { stage: states.STARTED },
        });
    });
    it('proposals received if the state is started', () => {
        toBeCalledWith({
            action    : stage.proposalsReceived,
            state     : { stage: states.STARTED },
            calledWith: { type: actions.PROPOSALS_RECEIVED },
        });
    });
    it('proposals received ignored if the state is not started', () => {
        notToBeCalled({
            action: stage.proposalsReceived,
            state : { stage: states.PROPOSALS_READY },
        });
    });
    it('purchase succeeded if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseSucceeded,
            state     : { stage: states.PROPOSALS_READY },
            calledWith: { type: actions.PURCHASE_SUCCEEDED },
        });
    });
    it('purchase succeeded ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseSucceeded,
            state : { stage: states.SUCCESSFUL_PURCHASE },
        });
    });
    it('purchase failed if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseFailed,
            state     : { stage: states.PROPOSALS_READY },
            calledWith: { type: actions.PURCHASE_FAILED },
        });
    });
    it('purchase failed ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseFailed,
            state : { stage: states.SUCCESSFUL_PURCHASE },
        });
    });
    it('open contract received if the state is successful purchase', () => {
        toBeCalledWith({
            action    : stage.openContractReceived,
            state     : { stage: states.SUCCESSFUL_PURCHASE },
            calledWith: { type: actions.OPEN_CONTRACT_RECEIVED },
        });
    });
    it('open contract ignored if the state is not successful purchase', () => {
        notToBeCalled({
            action: stage.openContractReceived,
            state : { stage: states.OPEN_CONTRACT },
        });
    });
    it('sell succeeded if the state is open contract', () => {
        toBeCalledWith({
            action    : stage.sellSucceeded,
            state     : { stage: states.OPEN_CONTRACT },
            calledWith: { type: actions.SELL_SUCCEEDED },
        });
    });
    it('sell succeeded ignored if the state is not open contract', () => {
        notToBeCalled({
            action: stage.sellSucceeded,
            state : { stage: states.INITIALIZED },
        });
    });
});
