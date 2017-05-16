import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createScope } from '../../../CliTools';
import rootReducer from '../../reducers/';
import * as states from '../../constants/states';
import init from './';

describe('Init actor', () => {
    it('should requestTicks and requestBalance, then should INITIALIZE', async () => {
        const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(createScope())));
        const data = { token: 'Xkq6oGFEHh6hJH8', initOptions: { symbol: 'R_100' } };
        await init({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });
});
