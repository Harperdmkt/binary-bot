import createStore from '../../createStore';
import * as actions from '../../constants/actions';
import watcher from './';

describe('watcher actor', () => {
    describe('watching before', () => {
        it('should wait for PROPOSALS_READY if STARTED', async () => {
            const store = createStore();
            store.dispatch({ type: actions.START, data: {} });
            setTimeout(() => store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} }), 1000);
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(true);
        });
        it('should immediately resolve if PROPOSALS_READY', async () => {
            const store = createStore();
            store.dispatch({ type: actions.START, data: {} });
            store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} });
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(true);
        });
        it('should resolve with false if not PROPOSALS_READY or STARTED', async () => {
            const store = createStore();
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(false);
        });
    });
    describe('watching during', () => {
        it('should resolve with true if SUCCESSFUL_PURCHASE or OPEN_CONTRACT', async () => {
            const store = createStore();
            store.dispatch({ type: actions.PURCHASE_SUCCESSFULLY, data: {} });
            let shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(true);
            store.dispatch({ type: actions.OPEN_CONTRACT_RECEIVED, data: {} });
            shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(true);
        });
        it('should resolve with false otherwise', async () => {
            const store = createStore();
            const shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(false);
        });
    });
});
