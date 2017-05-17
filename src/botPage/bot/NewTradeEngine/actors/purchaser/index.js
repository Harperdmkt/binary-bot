import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import purchase from '../../actions/purchase';
import waitForCondition from '../waitForCondition';

const purchaser = ({ data, store }) => {
    store.dispatch(purchase(data));
    store.dispatch({ type: actions.REQUEST_PURCHASE });
    return waitForCondition(store, state => state.stage === states.SUCCESSFUL_PURCHASE);
};

export default purchaser;
