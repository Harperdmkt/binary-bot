import * as states from '../../constants/states';
import waitForCondition from '../waitForCondition';

const watcher = async ({ store }) => {
    const { stage } = store.getState();
    if (stage === states.STARTED) {
        await waitForCondition(store, state => state.stage === states.PROPOSALS_READY);
        return true;
    } else if (stage === states.PROPOSALS_READY) {
        return true;
    }
    return false;
};

export default watcher;
