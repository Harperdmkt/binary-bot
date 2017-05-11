import * as constants from '../../constants';

const initialState = { name: constants.STOP };

const stage = (state = initialState, action) => {
    switch (action.type) {
        case constants.ERROR_OCCURRED:
            return { name: constants.STOP };
        case constants.SELL_SUCCEEDED:
        case constants.INITIALIZE:
            return { name: constants.INITIALIZED };
        case constants.START:
        case constants.PURCHASE_FAILED:
            return { name: constants.STARTED };
        case constants.PROPOSALS_RECEIVED:
            return { name: constants.PROPOSALS_READY };
        case constants.PURCHASE_SUCCEEDED:
            return { name: constants.SUCCESSFUL_PURCHASE };
        case constants.OPEN_CONTRACT_RECEIVED:
            return { name: constants.OPEN_CONTRACT };
        default:
            return state;
    }
};

export default stage;
