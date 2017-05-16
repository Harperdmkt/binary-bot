import createStore from '../../createStore';
import * as states from '../../constants/states';
import start from './';

describe('Start actor', () => {
    it('should initProposals and START', async () => {
        const store = createStore();
        const data = { contractTypes: ['CALL', 'PUT'] };
        await start({ data, store });
        const { stage, proposal, tradeOption } = store.getState();
        expect(stage).toEqual(states.STARTED);
        expect(proposal).toEqual(states.WAITING_FOR_TWO_PROPOSALS);
        expect(tradeOption).toEqual(data);
    });
});
