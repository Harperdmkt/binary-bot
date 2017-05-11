import * as constants from '../../constants';
import { toBeCalledWith, notToBeCalled } from '../tools';
import * as stage from './';

describe('Stage actions', () => {
    it('Initialize if the state is STOP and balance and ticks are ready', async () => {
        const data = { token: 'Xkq6oGFEHh6hJH8', options: { symbol: 'R_100' } };
        toBeCalledWith({
            action: stage.init,
            args  : data,
            state : {
                stage     : { name: constants.STOP },
                balance   : { balance: '123.00', currency: 'USD' },
                tickSignal: new Date().getTime(),
            },
            calledWith: { type: constants.INITIALIZE, data },
        });
    });
    it('Do not initialize if the state is already initialized or balance or tick is not ready', () => {
        notToBeCalled({
            action: stage.init,
            args  : { token: 'Xkq6oGFEHh6hJH8', options: { symbol: 'R_100' } },
            state : {
                stage     : { name: constants.INITIALIZED },
                balance   : { balance: '123.00', currency: 'USD' },
                tickSignal: new Date().getTime(),
            },
        });
        notToBeCalled({
            action: stage.init,
            args  : { token: 'Xkq6oGFEHh6hJH8', options: { symbol: 'R_100' } },
            state : {
                stage     : { name: constants.STOP },
                balance   : { balance: '', currency: '' },
                tickSignal: new Date().getTime(),
            },
        });
        notToBeCalled({
            action: stage.init,
            args  : { token: 'Xkq6oGFEHh6hJH8', options: { symbol: 'R_100' } },
            state : {
                stage     : { name: constants.STOP },
                balance   : { balance: '123.00', currency: 'USD' },
                tickSignal: 0,
            },
        });
    });
    it('Start if the state is initialized', () => {
        toBeCalledWith({
            action    : stage.start,
            state     : { stage: { name: constants.INITIALIZED } },
            calledWith: { type: constants.START },
        });
    });
    it('Do not start if the state is already running', () => {
        notToBeCalled({
            action: stage.start,
            state : { stage: { name: constants.STARTED } },
        });
    });
    it('proposals received if the state is started', () => {
        toBeCalledWith({
            action    : stage.proposalsReceived,
            state     : { stage: { name: constants.STARTED } },
            calledWith: { type: constants.PROPOSALS_RECEIVED },
        });
    });
    it('proposals received ignored if the state is not started', () => {
        notToBeCalled({
            action: stage.proposalsReceived,
            state : { stage: { name: constants.PROPOSALS_READY } },
        });
    });
    it('purchase succeeded if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseSucceeded,
            state     : { stage: { name: constants.PROPOSALS_READY } },
            calledWith: { type: constants.PURCHASE_SUCCEEDED },
        });
    });
    it('purchase succeeded ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseSucceeded,
            state : { stage: { name: constants.SUCCESSFUL_PURCHASE } },
        });
    });
    it('purchase failed if the state is proposals ready', () => {
        toBeCalledWith({
            action    : stage.purchaseFailed,
            state     : { stage: { name: constants.PROPOSALS_READY } },
            calledWith: { type: constants.PURCHASE_FAILED },
        });
    });
    it('purchase failed ignored if the state is not proposals ready', () => {
        notToBeCalled({
            action: stage.purchaseFailed,
            state : { stage: { name: constants.SUCCESSFUL_PURCHASE } },
        });
    });
    it('open contract received if the state is successful purchase', () => {
        toBeCalledWith({
            action    : stage.openContractReceived,
            state     : { stage: { name: constants.SUCCESSFUL_PURCHASE } },
            calledWith: { type: constants.OPEN_CONTRACT_RECEIVED },
        });
    });
    it('open contract ignored if the state is not successful purchase', () => {
        notToBeCalled({
            action: stage.openContractReceived,
            state : { stage: { name: constants.OPEN_CONTRACT } },
        });
    });
    it('sell succeeded if the state is open contract', () => {
        toBeCalledWith({
            action    : stage.sellSucceeded,
            state     : { stage: { name: constants.OPEN_CONTRACT } },
            calledWith: { type: constants.SELL_SUCCEEDED },
        });
    });
    it('sell succeeded ignored if the state is not open contract', () => {
        notToBeCalled({
            action: stage.sellSucceeded,
            state : { stage: { name: constants.INITIALIZED } },
        });
    });
});
