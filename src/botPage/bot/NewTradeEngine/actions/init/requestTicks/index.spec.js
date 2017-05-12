import { createScope } from '../../../../CliTools';
import * as actions from '../../../reducers/actions';
import requestTicks from './';
import dispatchPromise from '../../dispatchPromise';

describe('requestTicks action', () => {
    it('Should call the dispatch function in the future', async () => {
        const { dispatch, promise } = dispatchPromise();
        requestTicks('R_100')(dispatch, () => {}, createScope());
        const calledWith = await promise;
        expect(calledWith.type).toEqual(actions.TICK_SIGNAL);
        expect(typeof calledWith.data).toEqual('number');
    });
});
