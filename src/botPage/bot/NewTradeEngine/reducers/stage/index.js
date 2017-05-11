import * as constants from '../../constants';

const initialState = { name: constants.STOP };

const stage = (state = initialState, action) => {
    switch (action.type) {
        case constants.ERROR_OCCURRED:
            return { name: constants.STOP };
        case constants.INITIALIZE:
            return { name: constants.INITIALIZED, data: action.data };
        case constants.START:
            return { name: constants.STARTED };
        case constants.PROPOSALS_RECEIVED:
            return { name: constants.PROPOSALS_READY };
        case constants.PURCHASE_FAILED:
            return { name: constants.STARTED };
        case constants.PURCHASE_SUCCEEDED:
            return { name: constants.SUCCESSFUL_PURCHASE };
        case constants.OPEN_CONTRACT_RECEIVED:
            return { name: constants.OPEN_CONTRACT };
        case constants.SELL_SUCCEEDED:
            return { name: constants.INITIALIZED };
        default:
            return state;
    }
};

export default stage;
