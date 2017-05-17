import * as states from '../../constants/states';
import waitForCondition from '../waitForCondition';

const watcher = async ({ store, name }) => {
    const { stage } = store.getState();
    if (name === 'before') {
        if (stage === states.STARTED) {
            await waitForCondition(store, state => state.stage === states.PROPOSALS_READY);
            return true;
        }
        return stage === states.PROPOSALS_READY;
    } else if (name === 'during') {
        return stage === states.SUCCESSFUL_PURCHASE || stage === states.OPEN_CONTRACT;
    }
    return false;
};

export default watcher;
