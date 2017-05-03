import { Map } from 'immutable';
import * as constants from '../../constants';

const initialState = new Map();

const proposalPayloads = (state = initialState, action) => {
    switch (action.type) {
        case constants.UPDATE_PROPOSAL: {
            return state.set(action.data.uuid, action.data);
        }
        case constants.CLEAR_ALL_PROPOSALS:
            return new Map();
        default:
            return state;
    }
};

export default proposalPayloads;
