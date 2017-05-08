import { ADD_CONTRACT, INVALID } from '../../constants';
import contract from './';

describe('Contract reducer', () => {
    it('initial state', () => {
        expect(contract({}, { type: INVALID })).toEqual({});
    });
    it('add contract will add the contract', () => {
        expect(contract({}, { type: ADD_CONTRACT, contract: { bid_price: 1 } })).toEqual({
            bid_price: 1,
        });
    });
});
