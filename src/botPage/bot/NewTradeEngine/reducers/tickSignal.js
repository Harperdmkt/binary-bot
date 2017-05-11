import * as constants from '../constants';

const tickSignal = (state = false, action) => {
    switch (action.type) {
        case constants.TICK_SIGNAL:
            return action.data;
        default:
            return state;
    }
};

export default tickSignal;
