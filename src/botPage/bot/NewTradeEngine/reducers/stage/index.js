import * as states from '../states';
import * as actions from '../actions';

const initialState = states.STOP;

const stage = (state = initialState, action) => {
    switch (action.type) {
        case actions.ERROR_OCCURRED:
            return states.STOP;
        case actions.SELL_SUCCEEDED:
        case actions.INIT_DATA:
            return states.INITIALIZED;
        case actions.START:
        case actions.PURCHASE_FAILED:
            return states.STARTED;
        case actions.PROPOSALS_RECEIVED:
            return states.PROPOSALS_READY;
        case actions.PURCHASE_SUCCEEDED:
            return states.SUCCESSFUL_PURCHASE;
        case actions.OPEN_CONTRACT_RECEIVED:
            return states.OPEN_CONTRACT;
        default:
            return state;
    }
};

export default stage;
