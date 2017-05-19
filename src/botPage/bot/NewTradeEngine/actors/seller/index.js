import * as states from '../../constants/states';
import sell from '../../actions/sell';
import waitForCondition from '../waitForCondition';

const seller = ({ store }) => {
    const { contractId } = store.getState();
    store.dispatch(sell(contractId));
    return waitForCondition(store, state => state.stage === states.INITIALIZED);
};

export default seller;
