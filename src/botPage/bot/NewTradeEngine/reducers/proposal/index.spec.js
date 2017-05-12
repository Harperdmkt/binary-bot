import proposal from './';
import * as constants from '../../constants';
import action from '../actionCreator';

describe('Proposal Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = proposal(state, action(constants.INVALID)))).toEqual(constants.WAITING_FOR_TRADE_OPTION);
    });
    it('ONE_PROPOSAL_NEEDED request', () => {
        expect((state = proposal(state, action(constants.ONE_PROPOSAL_NEEDED)))).toEqual(
            constants.WAITING_FOR_ONE_PROPOSAL
        );
    });
    it('UPDATE_PROPOSAL go to ONE_PROPOSAL_RECEIVED', () => {
        expect(proposal(state, action(constants.UPDATE_PROPOSAL))).toEqual(constants.ONE_PROPOSAL_RECEIVED);
    });
    it('UPDATE_PROPOSAL go to ONE_PROPOSAL_RECEIVED', () => {
        expect(proposal(state, action(constants.UPDATE_PROPOSAL))).toEqual(constants.ONE_PROPOSAL_RECEIVED);
    });
    it('TWO_PROPOSALS_NEEDED request', () => {
        expect((state = proposal(constants.WAITING_FOR_TRADE_OPTION, action(constants.TWO_PROPOSALS_NEEDED)))).toEqual(
            constants.WAITING_FOR_TWO_PROPOSALS
        );
    });
    it('One UPDATE_PROPOSAL when waiting for two', () => {
        expect((state = proposal(state, action(constants.UPDATE_PROPOSAL)))).toEqual(
            constants.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
    it('Another UPDATE_PROPOSAL when waiting for one', () => {
        expect((state = proposal(state, action(constants.UPDATE_PROPOSAL)))).toEqual(constants.TWO_PROPOSALS_RECEIVED);
    });
    it('One UPDATE_PROPOSAL when all proposals were received', () => {
        expect((state = proposal(state, action(constants.UPDATE_PROPOSAL)))).toEqual(
            constants.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
});
