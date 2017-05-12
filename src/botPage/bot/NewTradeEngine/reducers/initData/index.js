import { Map } from 'immutable';
import * as actions from '../actions';

const initData = (state = new Map(), action) => {
    switch (action.type) {
        case actions.INIT_DATA:
            return action.data;
        default:
            return state;
    }
};

export default initData;
