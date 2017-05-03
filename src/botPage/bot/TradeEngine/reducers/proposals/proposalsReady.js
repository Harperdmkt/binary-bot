import * as constants from '../../constants';

const initialState = false;

const proposalsReady = (state = initialState, action) => {
    switch (action.type) {
        case constants.PROPOSALS_READY:
            return true;
        case constants.PROPOSALS_NOT_READY: {
            return false;
        }
        default:
            return state;
    }
};

export default proposalsReady;
