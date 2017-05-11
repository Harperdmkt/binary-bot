import { createScope } from '../../../CliTools';
import * as constants from '../../constants';
import { tick, balance } from './';

describe('initial requests (tick and balance)', () => {
    it('ASYNC: balance should dispatch BALANCE_RECEIVED', async () => {
        await new Promise(resolve => {
            balance('Xkq6oGFEHh6hJH8')(
                action => {
                    expect(action.data.currency).toEqual('USD');
                    expect(typeof +action.data.balance).toEqual('number');
                    expect(action.type === constants.BALANCE_RECEIVED);
                    resolve();
                },
                () => {},
                createScope()
            );
        });
    });
    it('ASYNC: tick should dispatch TICK_SIGNAL', async () => {
        await new Promise(resolve => {
            tick('R_100')(
                action => {
                    expect(typeof +action.data).toEqual('number');
                    expect(action.type === constants.TICK_SIGNAL);
                    resolve();
                },
                () => {},
                createScope()
            );
        });
    });
});
