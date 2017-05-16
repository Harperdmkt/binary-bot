import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createScope } from '../../../CliTools';
import rootReducer from '../../reducers/';
import * as states from '../../constants/states';
import init from './';

describe('Init actor', () => {
    it('should issue requestTicks and requestBalance, then should issue INITIALIZE', async () => {
        const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(createScope())));
        const data = { initOptions: { symbol: 'R_100' } };
        await init({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });
});
