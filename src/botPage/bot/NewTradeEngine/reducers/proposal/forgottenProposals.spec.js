import { List } from 'immutable';
import forgottenProposals from './forgottenProposals';
import * as constants from '../../constants';

let state;

describe('forgottenProposals reducers', () => {
    it('initial state', () => {
        expect((state = forgottenProposals(undefined, { type: constants.INVALID_ACTION }))).toEqual(new List());
    });
    it('ADD_FORGOTTEN_PROPOSAL_ID fired', () => {
        expect((state = forgottenProposals(state, { type: constants.ADD_FORGOTTEN_PROPOSAL_ID, data: 'id' }))).toEqual(
            new List(['id'])
        );
    });
    it('REMOVE_FORGOTTEN_PROPOSAL_ID fired', () => {
        expect(
            (state = forgottenProposals(state, { type: constants.REMOVE_FORGOTTEN_PROPOSAL_ID, data: 'id' }))
        ).toEqual(new List());
    });
});
