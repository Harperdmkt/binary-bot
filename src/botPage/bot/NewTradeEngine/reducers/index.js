import * as actions from '../constants/actions';
import * as states from '../constants/states';

const reducer = (state = { stage: states.STOPPED, initData: {} }, action) => {
    switch (action.type) {
        case actions.INIT:
            return { stage: states.INITIALIZED, initData: action.initData };
        default:
            return state;
    }
};
export default reducer;
