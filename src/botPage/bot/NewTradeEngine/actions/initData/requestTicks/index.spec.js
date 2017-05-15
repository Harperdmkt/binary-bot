import { createScope } from '../../../../CliTools';
import * as actions from '../../../reducers/actions';
import requestTicks from './';

describe('requestTicks action', () => {
    it('should not be called if symbol exists', async () => {
        let calledWith;
        await requestTicks('R_100')(
            action => calledWith = action,
            () => ({ initData: { symbol: 'R_100' } }),
            createScope()
        );
        expect(calledWith).toEqual(undefined);
    });
    it('Should call the dispatch function in the future', async () => {
        let calledWith;
        await requestTicks('R_100')(action => calledWith = action, () => ({ initData: {} }), createScope());
        expect(calledWith.type).toEqual(actions.TICK_SIGNAL);
        expect(typeof calledWith.data).toEqual('number');
    });
});
