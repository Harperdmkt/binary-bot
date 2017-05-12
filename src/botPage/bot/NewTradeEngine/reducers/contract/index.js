import * as constants from '../../constants';

const contract = (state = {}, action) => {
    switch (action.type) {
        case constants.OPEN_CONTRACT_RECEIVED:
            return action.data;
        default:
            return state;
    }
};

export default contract;
