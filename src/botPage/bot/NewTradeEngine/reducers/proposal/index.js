import * as constants from '../../constants';

const proposal = (state = constants.WAITING_FOR_TRADE_OPTION, action) => {
    switch (action.type) {
        case constants.ONE_PROPOSAL_NEEDED:
            return constants.WAITING_FOR_ONE_PROPOSAL;
        case constants.TWO_PROPOSALS_NEEDED:
            return constants.WAITING_FOR_TWO_PROPOSALS;
        case constants.UPDATE_PROPOSAL:
            if (state === constants.WAITING_FOR_TWO_PROPOSALS) {
                return constants.WAITING_FOR_ONE_MORE_PROPOSAL;
            }
            if (state === constants.WAITING_FOR_ONE_MORE_PROPOSAL) {
                return constants.TWO_PROPOSALS_RECEIVED;
            }
            if (state === constants.TWO_PROPOSALS_RECEIVED) {
                return constants.WAITING_FOR_ONE_MORE_PROPOSAL;
            }
            if (state === constants.WAITING_FOR_ONE_PROPOSAL) {
                return constants.ONE_PROPOSAL_RECEIVED;
            }
            return state;
        default:
            return state;
    }
};

export default proposal;
