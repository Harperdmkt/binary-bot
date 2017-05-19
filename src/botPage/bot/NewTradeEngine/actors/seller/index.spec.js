import { createScope } from '../../../CliTools';
import createStoreWithScope from '../../createStoreWithScope';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import seller from './';

describe('seller actor', () => {
    it('should try to purchase then PURCHASE_SUCCESSFULLY', async () => {
        const $scope = createScope();
        const { api } = $scope;

        const store = createStoreWithScope($scope);
        await api.authorize('Xkq6oGFEHh6hJH8');
        const { proposal: { id, ask_price: askPrice } } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 'h',
            symbol       : 'R_100',
        });

        const { buy: { contract_id: contractId } } = await api.buyContract(id, askPrice);

        store.dispatch({
            type: actions.PURCHASE_SUCCESSFULLY,
            data: contractId,
        });

        store.dispatch({
            type: actions.RECEIVE_OPEN_CONTRACT,
            data: {},
        });
        await seller({ store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });
});
