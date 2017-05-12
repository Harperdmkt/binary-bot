import { Map } from 'immutable';
import * as constants from '../../constants';

const initData = (state = new Map(), action) => {
    switch (action.type) {
        case constants.INIT_DATA:
            return action.data;
        default:
            return state;
    }
};

export default initData;
