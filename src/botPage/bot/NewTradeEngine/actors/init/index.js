import * as actions from '../../actions';
import * as states from '../../states';

const init = ({ initData, state: { stage } }) => {
    if (stage === states.STOPPED) {
        return Promise.resolve({ type: actions.INIT, initData });
    }
    return Promise.resolve();
};

export default init;
