import * as actions from '../../constants/actions';
import initProposals from '../../actions/initProposals';

const starter = ({ data, store }) => {
    const { initData } = store.getState();
    store.dispatch(initProposals(data));
    store.dispatch({ type: actions.START, data: { ...data, ...initData } });
};

export default starter;
