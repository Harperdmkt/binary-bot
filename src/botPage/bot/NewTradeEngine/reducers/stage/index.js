import * as constants from '../../constants';

const initialState = constants.STOP;

const stage = (state = initialState, action) => {
    switch (action.type) {
        case constants.START:
            return constants.STARTED;
        case constants.PROPOSALS_RECEIVED:
            return constants.PROPOSALS_READY;
        case constants.PURCHASE_FAILED:
            return constants.STARTED;
        case constants.PURCHASE_SUCCEEDED:
            return constants.SUCCESSFUL_PURCHASE;
        case constants.OPEN_CONTRACT_RECEIVED:
            return constants.OPEN_CONTRACT;
        case constants.SELL_SUCCEEDED:
            return constants.STOP;
        default:
            return state;
    }
};

export default stage;
