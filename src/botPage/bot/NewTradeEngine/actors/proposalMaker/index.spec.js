import createStore from '../../createStore';
import * as states from '../../constants/states';
import proposalMaker from './';

describe('proposalMaker actor', () => {
    it('should request for proposals then RECEIVE_PROPOSALS', async () => {
        const store = createStore();
        const data = {
            candleInterval: 60,
            contractTypes : ['DIGITEVEN', 'DIGITODD'],
            symbol        : 'R_100',
            amount        : 1,
            currency      : 'USD',
            duration      : 5,
            duration_unit : 't',
        };
        await proposalMaker({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.PROPOSALS_READY);
    });
});
