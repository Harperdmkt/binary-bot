import * as actions from '../../constants/actions';
import requestTicks from '../../actions/requestTicks';
import waitForCondition from '../waitForCondition';

const init = async ({ data, store }) => {
    const { initOptions: { symbol } } = data;
    store.dispatch(requestTicks(symbol));
    await waitForCondition(store, state => Number(state.lastTick) > 0);
    store.dispatch({ type: actions.INITIALIZE, data });
};

export default init;
