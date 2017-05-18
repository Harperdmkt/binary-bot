import { createScope } from '../../../CliTools';
import { toBeCalledWithAsync } from '../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import requestOpenContract from './';

describe('requestOpenContract action', () => {
    it('Should request for open contract', async () => {
        const $scope = createScope();
        const { api } = $scope;

        await api.authorize('Xkq6oGFEHh6hJH8');

        const { proposal: { id, ask_price: askPrice } } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 't',
            symbol       : 'R_100',
        });

        const { buy: { contract_id: contractId } } = await api.buyContract(id, askPrice);

        await toBeCalledWithAsync({
            $scope,
            action    : requestOpenContract,
            arg       : contractId,
            state     : { stage: states.SUCCESSFUL_PURCHASE },
            calledWith: {
                type: actions.RECEIVE_OPEN_CONTRACT,
                data: expect.objectContaining({
                    barrier            : expect.any(String),
                    barrier_count      : expect.any(Number),
                    bid_price          : expect.any(String),
                    buy_price          : expect.any(String),
                    contract_id        : expect.any(String),
                    contract_type      : expect.any(String),
                    currency           : expect.any(String),
                    current_spot       : expect.any(String),
                    current_spot_time  : expect.any(Number),
                    date_expiry        : expect.any(Number),
                    date_settlement    : expect.any(Number),
                    date_start         : expect.any(Number),
                    display_name       : expect.any(String),
                    entry_spot         : expect.any(String),
                    entry_tick         : expect.any(String),
                    entry_tick_time    : expect.any(String),
                    id                 : expect.any(String),
                    is_expired         : expect.any(Number),
                    is_forward_starting: expect.any(Number),
                    is_intraday        : expect.any(Number),
                    is_path_dependent  : expect.any(Number),
                    is_settleable      : expect.any(Number),
                    is_sold            : expect.any(Number),
                    is_valid_to_sell   : expect.any(Number),
                    longcode           : expect.any(String),
                    payout             : expect.any(String),
                    purchase_time      : expect.any(Number),
                    shortcode          : expect.any(String),
                    tick_count         : expect.any(Number),
                    transaction_ids    : expect.objectContaining({
                        buy: expect.any(String),
                    }),
                    underlying      : expect.any(String),
                    validation_error: expect.any(String),
                }),
            },
        });
    });
});
