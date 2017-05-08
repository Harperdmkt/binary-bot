import { createScope } from '../../../CliTools';
import * as constants from '../../constants';
import requestBalance from './requestBalance';
import { notToBeCalled } from '../tools';

describe('balance actions', () => {
    it('request balance is only done once', () => {
        notToBeCalled({
            action: requestBalance,
            args  : 'InvalidToken',
            state : { init: { balance: '1.00', currency: 'USD' } },
        });
    });
    describe('request balance with invalid token', () => {
        let action;
        beforeAll(done => {
            requestBalance('InvalidToken')(
                a => {
                    action = a;
                    done();
                },
                () => ({ init: { balance: '', currency: '' } }),
                createScope()
            );
        });
        it('requestBalance should dispatch ERROR_OCCURRED', () => {
            expect(action.type).toEqual(constants.ERROR_OCCURRED);
            expect(action.error.name).toEqual('InvalidToken');
        });
    });
    describe('request balance async', () => {
        let action;
        beforeAll(done => {
            requestBalance('Xkq6oGFEHh6hJH8')(
                a => {
                    action = a;
                    done();
                },
                () => ({ init: { balance: '', currency: '' } }),
                createScope()
            );
        });
        it('requestBalance should dispatch BALANCE_RECEIVED', () => {
            expect(action.type).toEqual(constants.BALANCE_RECEIVED);
            expect(action.currency).toEqual('USD');
            expect(typeof +action.balance).toEqual('number');
        });
    });
});
