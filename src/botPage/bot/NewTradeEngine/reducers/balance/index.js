import { Map } from 'immutable';
import * as actions from '../../constants/actions';

const initialState = new Map({
    balance : '',
    currency: '',
});

const init = (state = initialState, action) => {
    switch (action.type) {
        case actions.BALANCE_RECEIVED:
            return action.data;
        default:
            return state;
    }
};

export default init;
