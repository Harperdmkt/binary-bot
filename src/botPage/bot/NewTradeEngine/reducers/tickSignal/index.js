import * as actions from '../actions';

const tickSignal = (state = false, action) => {
    switch (action.type) {
        case actions.TICK_SIGNAL:
            return action.data;
        default:
            return state;
    }
};

export default tickSignal;
