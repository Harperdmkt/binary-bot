import * as actions from '../../constants/actions';
import initProposals from '../../actions/initProposals';

const starter = ({ data, store }) => {
    const { initData: { initOptions } } = store.getState();
    const tradeOption = { ...data, ...initOptions };
    store.dispatch(initProposals(tradeOption));
    store.dispatch({ type: actions.START, data: tradeOption });
};

export default starter;
