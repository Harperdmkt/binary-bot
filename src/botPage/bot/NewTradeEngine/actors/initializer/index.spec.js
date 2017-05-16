import createStore from '../../createStore';
import * as states from '../../constants/states';
import initializer from './';

describe('Initializer actor', () => {
    it('should requestTicks and requestBalance, then should INITIALIZE', async () => {
        const store = createStore();
        const data = { token: 'Xkq6oGFEHh6hJH8', initOptions: { symbol: 'R_100' } };
        await initializer({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });
});
