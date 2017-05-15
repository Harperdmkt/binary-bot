import * as actions from '../../constants/actions';
import * as states from '../../constants/states';

const init = ({ initData, state: { stage } }) => {
    if (stage === states.STOPPED) {
        return Promise.resolve({ type: actions.INIT, initData });
    }
    return Promise.resolve();
};

export default init;
