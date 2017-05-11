import { createScope } from '../../../../CliTools';
import { requestTicks, requestBalance } from './';

describe('initial requests (tick and balance)', () => {
    it('ASYNC: requestBalance should return balance object', async () => {
        const balanceObj = await requestBalance('Xkq6oGFEHh6hJH8', createScope());
        expect(balanceObj.currency).toEqual('USD');
        expect(typeof +balanceObj.balance).toEqual('number');
    });
    it('ASYNC: requestTicks should return true', async () => {
        const tickStreamReady = await requestTicks('R_100', createScope());
        expect(tickStreamReady).toEqual(true);
    });
});
