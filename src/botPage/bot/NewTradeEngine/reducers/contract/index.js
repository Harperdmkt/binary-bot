import { ADD_CONTRACT } from '../../constants';

const contract = (state = {}, action) => {
    switch (action.type) {
        case ADD_CONTRACT:
            return action.contract;
        default:
            return state;
    }
};

export default contract;
