import * as states from '../../constants/states';
import * as actions from '../../constants/actions';

const initialState = states.STOPPED;

const stage = (state = initialState, action) => {
    switch (action.type) {
        case actions.ERROR_OCCURRED:
            return states.STOPPED;
        case actions.SELL_SUCCEEDED:
        case actions.INITIALIZE:
            return states.INITIALIZED;
        case actions.START:
        case actions.PURCHASE_FAILED:
            return states.STARTED;
        case actions.RECEIVE_PROPOSALS:
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
