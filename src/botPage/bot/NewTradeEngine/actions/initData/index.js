import requestBalance from './requestBalance';
import requestTicks from './requestTicks';
import * as actions from '../../reducers/actions';

const initData = data => (dispatch, getState, $scope) => {
    const { token, options: { symbol } } = data;
    return Promise.all([
        requestTicks(symbol)(dispatch, getState, $scope),
        requestBalance(token)(dispatch, getState, $scope),
    ]).then(() => dispatch({ type: actions.INIT_DATA, data }));
};

export default initData;
