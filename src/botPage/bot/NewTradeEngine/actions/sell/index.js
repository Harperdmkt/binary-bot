import { recoverFromError } from '../../../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';

const sell = () => async (dispatch, getState, { api }) => {
    const state = getState();
    const { stage } = state;
    if (stage !== states.OPEN_CONTRACT) {
        return;
    }

    const { contractId } = state;

    await recoverFromError(() => api.sellContract(contractId, 0), () => {});

    dispatch({ type: actions.SELL_SUCCESSFULLY });
};

export default sell;
