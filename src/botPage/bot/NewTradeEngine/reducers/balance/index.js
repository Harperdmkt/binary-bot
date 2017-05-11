import * as constants from '../../constants';

const initialState = {
    balance : '',
    currency: '',
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case constants.BALANCE_RECEIVED:
            return {
                ...action.data,
            };
        default:
            return state;
    }
};

export default init;
