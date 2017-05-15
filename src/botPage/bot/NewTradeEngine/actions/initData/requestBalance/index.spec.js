import { createScope } from '../../../../CliTools';
import * as actions from '../../../reducers/actions';
import requestBalance from './';

describe('requestBalance action', () => {
    it('should not be called if balance exists', async () => {
        let calledWith;
        await requestBalance('Xkq6oGFEHh6hJH8')(
            action => calledWith = action,
            () => ({ balance: { balance: '12.00' } }),
            createScope()
        );
        expect(calledWith).toEqual(undefined);
    });
    it('Should dispatch the current balance', async () => {
        let calledWith;
        await requestBalance('Xkq6oGFEHh6hJH8')(action => calledWith = action, () => ({ balance: {} }), createScope());
        expect(calledWith.type).toEqual(actions.BALANCE_RECEIVED);
        expect(typeof calledWith.data.get('balance')).toEqual('string');
        expect(+calledWith.data.get('balance')).not.toEqual(NaN);
        expect(typeof calledWith.data.get('currency')).toEqual('string');
    });
});
