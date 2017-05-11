import { Map } from 'immutable';
import init from './';
import * as constants from '../../constants';

const action = type => ({ type });

describe('Balance Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = init(state, action(constants.INVALID)))).toEqual(
            new Map({
                balance : '',
                currency: '',
            })
        );
    });
    it('Balance received', () => {
        expect(
            (state = init(state, {
                type: constants.BALANCE_RECEIVED,
                data: new Map({
                    balance : '123.00',
                    currency: 'USD',
                }),
            }))
        ).toEqual(
            new Map({
                balance : '123.00',
                currency: 'USD',
            })
        );
    });
    it('Balance received', () => {
        expect(
            (state = init(state, {
                type: constants.BALANCE_RECEIVED,
                data: new Map({
                    balance : '124.00',
                    currency: 'USD',
                }),
            }))
        ).toEqual(
            new Map({
                balance : '124.00',
                currency: 'USD',
            })
        );
    });
});
