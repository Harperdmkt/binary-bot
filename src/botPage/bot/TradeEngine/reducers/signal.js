import * as constants from '../constants';

const initialState = {
    stage: constants.STOP,
};

const signal = (state = initialState, action) => {
    switch (action.type) {
        case constants.START:
            return {
                stage: constants.BEFORE_PURCHASE,
            };
        case constants.PURCHASE_SUCCESSFUL:
            return {
                stage       : constants.DURING_PURCHASE,
                openContract: false,
            };
        case constants.OPEN_CONTRACT:
            return {
                stage       : constants.DURING_PURCHASE,
                openContract: true,
            };
        case constants.SELL:
            return {
                stage: constants.STOP,
            };
        default:
            return state;
    }
};

export default signal;
