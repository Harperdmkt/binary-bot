import createStore from '../../createStore';
import * as states from '../../constants/states';
import start from './';

describe('Start actor', () => {
    it('should requestProposals and START', async () => {
        const store = createStore();
        const data = { contractTypes: ['CALL', 'PUT'] };
        await start({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.STARTED);
    });
});
