import * as actions from '../../actions';
import * as states from '../../states';
import init from './';

describe('Init actor', () => {
    it('should not run the init if bot is not stopped', async () => {
        const action = await init({ initData: {}, state: { stage: states.INITIALIZED } });
        expect(action).toEqual(undefined);
    });
    it('should initialize the bot if stopped', async () => {
        const initData = { token: 'token', initOptions: {} };
        const action = await init({ initData, state: { stage: states.STOPPED } });
        expect(action).toEqual({ type: actions.INIT, initData });
    });
});
