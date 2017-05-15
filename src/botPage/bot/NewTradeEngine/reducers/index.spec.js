import * as actions from '../actions';
import * as states from '../states';
import reducer from './';

describe('Bot reducers', () => {
    it('should be stopped in the beginning', () => {
        expect(reducer(undefined, { type: '' })).toEqual({ stage: states.STOPPED, initData: {} });
    });
    it('should change state to initialized on init action', () => {
        const initData = { token: 'token', initOptions: { symbol: 'R_100' } };
        expect(reducer(undefined, { type: actions.INIT, initData })).toEqual({ stage: states.INITIALIZED, initData });
    });
});
