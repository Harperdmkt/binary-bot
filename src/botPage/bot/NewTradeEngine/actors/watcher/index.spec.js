import createStore from '../../createStore';
import * as actions from '../../constants/actions';
import watcher from './';

describe('watcher actor', () => {
    it('should wait for PROPOSALS_READY if STARTED', async () => {
        const store = createStore();
        store.dispatch({ type: actions.START, data: {} });
        setTimeout(() => store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} }), 1000);
        const shouldContinue = await watcher({ store });
        expect(shouldContinue).toEqual(true);
    });
    it('should immediately resolve if PROPOSALS_READY', async () => {
        const store = createStore();
        store.dispatch({ type: actions.START, data: {} });
        store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} });
        const shouldContinue = await watcher({ store });
        expect(shouldContinue).toEqual(true);
    });
    it('should resolve with false if not in a correct state', async () => {
        const store = createStore();
        const shouldContinue = await watcher({ store });
        expect(shouldContinue).toEqual(false);
    });
});
