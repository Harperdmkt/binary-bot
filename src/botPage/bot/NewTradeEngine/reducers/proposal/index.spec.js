import proposal from './';
import * as states from '../states';
import * as actions from '../actions';
import action from '../actionCreator';

describe('Proposal Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = proposal(state, action(actions.INVALID)))).toEqual(states.WAITING_FOR_TRADE_OPTION);
    });
    it('actions.ONE_PROPOSAL_NEEDED request', () => {
        expect((state = proposal(state, action(actions.ONE_PROPOSAL_NEEDED)))).toEqual(states.WAITING_FOR_ONE_PROPOSAL);
    });
    it('actions.UPDATE_PROPOSAL go to states.ONE_PROPOSAL_RECEIVED', () => {
        expect(proposal(state, action(actions.UPDATE_PROPOSAL))).toEqual(states.ONE_PROPOSAL_RECEIVED);
    });
    it('actions.UPDATE_PROPOSAL go to states.ONE_PROPOSAL_RECEIVED', () => {
        expect(proposal(state, action(actions.UPDATE_PROPOSAL))).toEqual(states.ONE_PROPOSAL_RECEIVED);
    });
    it('actions.TWO_PROPOSALS_NEEDED request', () => {
        expect((state = proposal(states.WAITING_FOR_TRADE_OPTION, action(actions.TWO_PROPOSALS_NEEDED)))).toEqual(
            states.WAITING_FOR_TWO_PROPOSALS
        );
    });
    it('One actions.UPDATE_PROPOSAL when waiting for two', () => {
        expect((state = proposal(state, action(actions.UPDATE_PROPOSAL)))).toEqual(
            states.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
    it('Another actions.UPDATE_PROPOSAL when waiting for one', () => {
        expect((state = proposal(state, action(actions.UPDATE_PROPOSAL)))).toEqual(states.TWO_PROPOSALS_RECEIVED);
    });
    it('One actions.UPDATE_PROPOSAL when all proposals were received', () => {
        expect((state = proposal(state, action(actions.UPDATE_PROPOSAL)))).toEqual(
            states.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
    it('actions.RENEW_PROPOSALS from states.TWO_PROPOSALS_RECEIVED should go to states.WAITING_FOR_TWO_PROPOSALS', () => {
        expect(proposal(states.TWO_PROPOSALS_RECEIVED, action(actions.RENEW_PROPOSALS))).toEqual(
            states.WAITING_FOR_TWO_PROPOSALS
        );
    });
    it('actions.RENEW_PROPOSALS from states.ONE_PROPOSAL_RECEIVED should go to states.WAITING_FOR_ONE_PROPOSAL', () => {
        expect(proposal(states.ONE_PROPOSAL_RECEIVED, action(actions.RENEW_PROPOSALS))).toEqual(
            states.WAITING_FOR_ONE_PROPOSAL
        );
    });
});
