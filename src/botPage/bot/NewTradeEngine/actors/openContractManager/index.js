import * as states from '../../constants/states';
import requestOpenContract from '../../actions/requestOpenContract';
import waitForCondition from '../waitForCondition';

const openContractManager = ({ store, data }) => {
    store.dispatch(requestOpenContract(data));
    return waitForCondition(store, state => state.stage === states.OPEN_CONTRACT);
};

export default openContractManager;
