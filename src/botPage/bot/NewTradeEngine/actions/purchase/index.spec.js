import { createScope } from '../../../CliTools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import { toBeCalledWithAsync, notToBeCalled } from '../tools';
import purchase from './';

describe('purchase action', () => {
    it('should not be called if not PURCHASING', () => {
        notToBeCalled({
            action: purchase,
            arg   : 'CALL',
            state : { stage: states.STARTED },
        });
    });
    it('Should PURCHASE_SUCCESSFUL', async () => {
        const $scope = createScope();
        const { api } = $scope;

        await api.authorize('Xkq6oGFEHh6hJH8');
        const { proposal } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 't',
            symbol       : 'R_100',
        });

        await toBeCalledWithAsync({
            $scope,
            action: purchase,
            arg   : 'CALL',
            state : {
                stage    : states.PURCHASING,
                proposals: [
                    {
                        ...proposal,
                        contractType: 'CALL',
                    },
                ],
            },
            calledWith: expect.objectContaining({
                type: actions.PURCHASE_SUCCESSFULLY,
                data: expect.any(String),
            }),
        });
    });
});
