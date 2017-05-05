import * as constants from '../../constants';

const initialState = {};

const tradeOption = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_TRADE_OPTION:
            return action.data;
        default:
            return state;
    }
};

export default tradeOption;
