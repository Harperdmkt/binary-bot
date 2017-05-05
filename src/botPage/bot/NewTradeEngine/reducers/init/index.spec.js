import init from './';
import * as constants from '../../constants';

const action = type => ({ type });

describe('Init Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = init(state, action(constants.INVALID)))).toEqual({
            tickStreamReady: false,
            balance        : '',
            currency       : '',
        });
    });
    it('ticks received', () => {
        expect((state = init(state, action(constants.TICKS_RECEIVED)))).toEqual({
            tickStreamReady: true,
            balance        : '',
            currency       : '',
        });
    });
    it('Balance received', () => {
        expect(
            (state = init(state, {
                type    : constants.BALANCE_RECEIVED,
                balance : '123.00',
                currency: 'USD',
            }))
        ).toEqual({
            tickStreamReady: true,
            balance        : '123.00',
            currency       : 'USD',
        });
    });
});
