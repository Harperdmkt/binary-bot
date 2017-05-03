import { List } from 'immutable';
import * as constants from '../constants';
import { toBeCalledWith, notToBeCalled } from './tools';
import * as actions from './proposals';

describe('proposal actions', () => {
    it('Make proposals', () => {
        toBeCalledWith({
            action    : actions.makeProposals,
            args      : { duration: 5 },
            state     : { proposals: { tradeOption: {} } },
            calledWith: {
                type: constants.ADD_TRADE_OPTION,
                data: { duration: 5 },
            },
        });
    });
    it('Make proposals with same trade options', () => {
        notToBeCalled({
            action: actions.makeProposals,
            args  : { duration: 5 },
            state : { proposals: { tradeOption: { duration: 5 } } },
        });
    });
    it('update proposal', () => {
        toBeCalledWith({
            action    : actions.updateProposal,
            args      : { passthrough: { contract_type: 'CALL', uuid: 'id1' }, proposal: { amount: 1 } },
            state     : { proposals: { forgottenProposals: new List(['id0']) } },
            calledWith: {
                type: constants.UPDATE_PROPOSAL,
                data: { contract_type: 'CALL', uuid: 'id1', amount: 1 },
            },
        });
    });
    it('update proposal should not be called for forgotten proposals', () => {
        notToBeCalled({
            action: actions.updateProposal,
            args  : { passthrough: { contract_type: 'PUT', uuid: 'id0' }, proposal: { amount: 2 } },
            state : { proposals: { forgottenProposals: new List(['id0']) } },
        });
    });
    it('proposals ready', () => {
        toBeCalledWith({
            action: actions.proposalsReady,
            state : {
                proposals: {
                    proposalPayloads: new List([{ contract_type: 'CALL' }, { contract_type: 'PUT' }]),
                    tradeOption     : { contractTypes: ['CALL', 'PUT'] },
                },
            },
            calledWith: {
                type: constants.PROPOSALS_READY,
            },
        });
    });
    it('clear proposals', () => {
        toBeCalledWith({
            action    : actions.clearAllProposals,
            state     : { proposals: { contract_type: 'CALL', uuid: 'id1' } },
            calledWith: {
                type: constants.CLEAR_ALL_PROPOSALS,
            },
        });
    });
    it('proposals not ready', () => {
        toBeCalledWith({
            action    : actions.proposalsNotReady,
            state     : { proposals: { proposalsReady: true } },
            calledWith: {
                type: constants.PROPOSALS_NOT_READY,
            },
        });
    });
    it('add forgotten proposal id', () => {
        toBeCalledWith({
            action    : actions.addForgottenProposalId,
            args      : 'id0',
            state     : { proposals: { contract_type: 'CALL', uuid: 'id1' } },
            calledWith: {
                type: constants.ADD_FORGOTTEN_PROPOSAL_ID,
                data: 'id0',
            },
        });
    });
    it('remove forgotten proposal id', () => {
        toBeCalledWith({
            action    : actions.removeForgottenProposalId,
            args      : 'id0',
            state     : { proposals: { forgottenProposals: new List(['id0']) } },
            calledWith: {
                type: constants.REMOVE_FORGOTTEN_PROPOSAL_ID,
                data: 'id0',
            },
        });
    });
});
