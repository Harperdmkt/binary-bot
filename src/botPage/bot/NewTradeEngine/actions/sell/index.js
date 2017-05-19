import { doUntilDone } from '../../../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';

const sell = contractId => async (dispatch, getState, { api }) => {
    const state = getState();
    const { stage } = state;
    if (stage !== states.OPEN_CONTRACT) {
        return;
    }

    await doUntilDone(() => api.sellContract(contractId, 0));

    dispatch({ type: actions.SELL_SUCCESSFULLY });
};

export default sell;
