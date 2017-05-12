import { createScope } from '../../../../CliTools';
import * as actions from '../../../reducers/actions';
import requestBalance from './';
import dispatchPromise from '../../dispatchPromise';

describe('requestBalance action', () => {
    it('Should dispatch the current balance', async () => {
        const { dispatch, promise } = dispatchPromise();
        requestBalance('Xkq6oGFEHh6hJH8')(dispatch, () => {}, createScope());
        const calledWith = await promise;
        expect(calledWith.type).toEqual(actions.BALANCE_RECEIVED);
        expect(typeof calledWith.data.get('balance')).toEqual('string');
        expect(+calledWith.data.get('balance')).not.toEqual(NaN);
        expect(typeof calledWith.data.get('currency')).toEqual('string');
    });
});
