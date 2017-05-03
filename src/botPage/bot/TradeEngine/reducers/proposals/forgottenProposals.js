import { List } from 'immutable';
import * as constants from '../../constants';

const initialState = new List();

const forgottenProposals = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_FORGOTTEN_PROPOSAL_ID:
            return state.push(action.data);
        case constants.REMOVE_FORGOTTEN_PROPOSAL_ID: {
            const index = state.indexOf(action.data);
            if (index < 0) {
                return state;
            }
            return state.delete(index);
        }
        default:
            return state;
    }
};

export default forgottenProposals;
