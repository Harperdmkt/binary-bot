import { Map } from 'immutable';
import proposalPayloads from './proposalPayloads';
import * as constants from '../../constants';

let state;

describe('proposalPayloadsReady reducers', () => {
    it('initial state', () => {
        expect((state = proposalPayloads(undefined, { type: constants.INVALID_ACTION }))).toEqual(new Map());
    });
    it('UPDATE_PROPOSAL fired', () => {
        expect(
            (state = proposalPayloads(state, {
                type: constants.UPDATE_PROPOSAL,
                data: { contract_type: 'CALL', uuid: 'id0' },
            }))
        ).toEqual(new Map({ id0: { contract_type: 'CALL', uuid: 'id0' } }));
    });
    it('CLEAR_ALL_PROPOSALS fired', () => {
        expect((state = proposalPayloads(state, { type: constants.CLEAR_ALL_PROPOSALS }))).toEqual(new Map());
    });
});
