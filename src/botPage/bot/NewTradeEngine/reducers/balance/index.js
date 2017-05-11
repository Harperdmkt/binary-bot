import { Map } from 'immutable';
import * as constants from '../../constants';

const initialState = new Map({
    balance : '',
    currency: '',
});

const init = (state = initialState, action) => {
    switch (action.type) {
        case constants.BALANCE_RECEIVED:
            return action.data;
        default:
            return state;
    }
};

export default init;
