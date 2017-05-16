import { toBeCalledWithAsync } from '../tools';
import * as actions from '../../constants/actions';
import requestProposals from './';

describe('requestProposals action', () => {
    it('should RECEIVE_PROPOSALS', async () => {
        await toBeCalledWithAsync({
            action: requestProposals,
            arg   : {
                candleInterval: 60,
                contractTypes : ['CALL', 'PUT'],
                symbol        : 'R_100',
                amount        : 1,
                currency      : 'USD',
                duration      : 5,
                duration_unit : 't',
            },
            state     : {},
            calledWith: {
                type: actions.UPDATE_PROPOSAL,
                data: expect.objectContaining({
                    echo_req   : expect.any(Object),
                    msg_type   : expect.any(String),
                    req_id     : expect.any(Number),
                    passthrough: {
                        contractType: expect.any(String),
                        uuid        : expect.any(String),
                    },
                    proposal: {
                        ask_price    : expect.any(String),
                        date_start   : expect.any(String),
                        display_value: expect.any(String),
                        id           : expect.any(String),
                        longcode     : expect.any(String),
                        payout       : expect.any(String),
                        spot         : expect.any(String),
                        spot_time    : expect.any(String),
                    },
                }),
            },
        });
    });
});
