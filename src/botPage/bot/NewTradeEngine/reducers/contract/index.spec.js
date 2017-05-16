import contract from './';
import * as actions from '../../constants/actions';

describe('contract reducer', () => {
    let state;
    it('contract should be empty', () => {
        expect((state = contract(state, { type: actions.INVALID }))).toEqual({});
    });
    it('actions.OPEN_CONTRACT_RECEIVED should set contract', () => {
        expect(
            (state = contract(state, { type: actions.OPEN_CONTRACT_RECEIVED, data: { id: 'oi1joi3ejoij' } }))
        ).toEqual({
            id: 'oi1joi3ejoij',
        });
    });
});
