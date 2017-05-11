import * as constants from '../../constants';

const initialState = constants.STOP;

const stage = (state = initialState, action) => {
    switch (action.type) {
        case constants.ERROR_OCCURRED:
            return constants.STOP;
        case constants.SELL_SUCCEEDED:
        case constants.INITIALIZE:
            return constants.INITIALIZED;
        case constants.START:
        case constants.PURCHASE_FAILED:
            return constants.STARTED;
        case constants.PROPOSALS_RECEIVED:
            return constants.PROPOSALS_READY;
        case constants.PURCHASE_SUCCEEDED:
            return constants.SUCCESSFUL_PURCHASE;
        case constants.OPEN_CONTRACT_RECEIVED:
            return constants.OPEN_CONTRACT;
        default:
            return state;
    }
};

export default stage;
