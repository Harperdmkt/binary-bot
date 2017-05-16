import { toBeCalledWith, notToBeCalled } from '../tools';
import * as actions from '../../constants/actions';
import requestProposals from './';

describe('requestProposals action', () => {
    const tradeOption = { contractTypes: ['CALL'] };
    it('should not do anything if tradeOption is the same', () => {
        notToBeCalled({
            action: requestProposals,
            arg   : { contractTypes: ['CALL'] },
            state : { tradeOption },
        });
    });
    it('Should REQUEST_ONE_PROPOSAL', () => {
        toBeCalledWith({
            action    : requestProposals,
            arg       : tradeOption,
            state     : { tradeOption: {} },
            calledWith: {
                type: actions.REQUEST_ONE_PROPOSAL,
            },
        });
    });
    it('Should REQUEST_TWO_PROPOSALS', () => {
        toBeCalledWith({
            action    : requestProposals,
            arg       : { contractTypes: ['CALL', 'PUT'] },
            state     : { tradeOption: {} },
            calledWith: {
                type: actions.REQUEST_TWO_PROPOSALS,
            },
        });
    });
});
