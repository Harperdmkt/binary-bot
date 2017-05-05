import * as constants from '../../constants';

const initialState = {
    tickStreamReady: false,
    balance        : '',
    currency       : '',
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case constants.TICKS_RECEIVED:
            return {
                ...state,
                tickStreamReady: true,
            };
        case constants.BALANCE_RECEIVED:
            return {
                ...state,
                balance : action.balance,
                currency: action.currency,
            };
        default:
            return state;
    }
};

export default init;
