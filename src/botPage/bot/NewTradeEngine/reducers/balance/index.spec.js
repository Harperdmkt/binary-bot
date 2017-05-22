import init from './';
import * as actions from '../../constants/actions';

const action = type => ({ type });

describe('Balance Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = init(state, action(actions.INVALID)))).toEqual({
            balance : '',
            currency: '',
        });
    });
    it('Balance received', () => {
        expect(
            (state = init(state, {
                type: actions.BALANCE_RECEIVED,
                data: {
                    balance : '123.00',
                    currency: 'USD',
                },
            }))
        ).toEqual({
            balance : '123.00',
            currency: 'USD',
        });
    });
    it('Balance received', () => {
        expect(
            (state = init(state, {
                type: actions.BALANCE_RECEIVED,
                data: {
                    balance : '124.00',
                    currency: 'USD',
                },
            }))
        ).toEqual({
            balance : '124.00',
            currency: 'USD',
        });
    });
});
