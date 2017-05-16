import createStore from '../../createStore';
import * as states from '../../constants/states';
import starter from './';

describe('Starter actor', () => {
    it('should initProposals and START', async () => {
        const store = createStore();
        const data = { contractTypes: ['CALL', 'PUT'] };
        await starter({ data, store });
        const { stage, proposalStage, tradeOption } = store.getState();
        expect(stage).toEqual(states.STARTED);
        expect(proposalStage).toEqual(states.WAITING_FOR_TWO_PROPOSALS);
        expect(tradeOption).toEqual(data);
    });
});
