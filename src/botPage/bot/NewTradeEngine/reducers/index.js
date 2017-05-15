import * as actions from '../actions';
import * as states from '../states';

const reducer = (state = { stage: states.stopped, initData: {} }, action) => {
    switch (action.type) {
        case actions.init:
            return { stage: states.initialized, initData: action.initData };
        default:
            return state;
    }
};
export default reducer;
