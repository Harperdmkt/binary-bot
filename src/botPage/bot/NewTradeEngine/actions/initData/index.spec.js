import { createScope } from '../../../CliTools';
import * as actions from '../../reducers/actions';
import initData from './';

describe('initData action', () => {
    it('should request for init data', async () => {
        let calledWith;

        const data = { token: 'Xkq6oGFEHh6hJH8', options: { symbol: 'R_100' } };
        await initData(data)(action => calledWith = action, () => ({ initData: {}, balance: {} }), createScope());
        expect(calledWith).toEqual({ type: actions.INIT_DATA, data });
    });
});
