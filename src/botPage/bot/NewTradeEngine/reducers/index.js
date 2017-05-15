import * as actions from '../actions';
import * as states from '../states';

const reducer = (state = { stage: states.stopped }, action) => {
    switch (action.type) {
        case actions.init:
            return { stage: states.initialized };
        default:
            return state;
    }
};
export default reducer;
