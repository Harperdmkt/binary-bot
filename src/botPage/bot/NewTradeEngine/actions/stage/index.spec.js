import * as constants from '../../constants';
import { toBeCalledWith, notToBeCalled } from '../tools';
import * as stage from './';

describe('Stage actions', () => {
    it('Start if the state is stop', () => {
        toBeCalledWith({
            action    : stage.start,
            state     : { stage: constants.STOP },
            calledWith: { type: constants.START },
        });
    });
    it('Do not start if the state is not stop', () => {
        notToBeCalled({
            action: stage.start,
            state : constants.STARTED,
        });
    });
    it('proposals received if the state is started', () => {
        toBeCalledWith({
            action    : stage.proposalsReceived,
            state     : { stage: constants.STARTED },
            calledWith: { type: constants.PROPOSALS_RECEIVED },
        });
    });
    it('proposals received ignored if the state is not started', () => {
        notToBeCalled({
            action: stage.proposalsReceived,
            state : constants.PROPOSALS_READY,
        });
    });
    it('purchase succeeded if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseSucceeded,
            state     : { stage: constants.PROPOSALS_READY },
            calledWith: { type: constants.PURCHASE_SUCCEEDED },
        });
    });
    it('purchase succeeded ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseSucceeded,
            state : constants.SUCCESSFUL_PURCHASE,
        });
    });
    it('purchase failed if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseFailed,
            state     : { stage: constants.PROPOSALS_READY },
            calledWith: { type: constants.PURCHASE_FAILED },
        });
    });
    it('purchase failed ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseFailed,
            state : constants.SUCCESSFUL_PURCHASE,
        });
    });
    it('open contract received if the state is successful purchase', () => {
        toBeCalledWith({
            action    : stage.openContractReceived,
            state     : { stage: constants.SUCCESSFUL_PURCHASE },
            calledWith: { type: constants.OPEN_CONTRACT_RECEIVED },
        });
    });
    it('open contract ignored if the state is not successful purchase', () => {
        notToBeCalled({
            action: stage.openContractReceived,
            state : constants.OPEN_CONTRACT,
        });
    });
    it('sell succeeded if the state is open contract', () => {
        toBeCalledWith({
            action    : stage.sellSucceeded,
            state     : { stage: constants.OPEN_CONTRACT },
            calledWith: { type: constants.SELL_SUCCEEDED },
        });
    });
    it('sell succeeded ignored if the state is not open contract', () => {
        notToBeCalled({
            action: stage.sellSucceeded,
            state : constants.STOP,
        });
    });
});
