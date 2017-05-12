import contract from './';
import * as constants from '../../constants';

describe('contract reducer', () => {
    let state;
    it('contract should be empty', () => {
        expect((state = contract(state, { type: constants.INVALID }))).toEqual({});
    });
    it('OPEN_CONTRACT_RECEIVED should set contract', () => {
        expect(
            (state = contract(state, { type: constants.OPEN_CONTRACT_RECEIVED, data: { id: 'oi1joi3ejoij' } }))
        ).toEqual({ id: 'oi1joi3ejoij' });
    });
});
