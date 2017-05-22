import * as actions from '../../constants/actions';

const contract = (state = {}, action) => {
    switch (action.type) {
        case actions.RECEIVE_OPEN_CONTRACT:
            return action.data;
        default:
            return state;
    }
};

export default contract;
