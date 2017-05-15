import * as actions from '../../actions';
import * as states from '../../states';

const init = ({ initData, state: { stage } }) => {
    if (stage === states.stopped) {
        return Promise.resolve({ type: actions.init, initData });
    }
    return Promise.resolve();
};

export default init;
