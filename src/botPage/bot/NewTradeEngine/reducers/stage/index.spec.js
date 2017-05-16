import stage from './';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import action from '../actionCreator';

describe('Stage Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = stage(state, action(actions.INVALID)))).toEqual(states.STOPPED);
    });
    it('Fatal error occurred during trade', () => {
        expect(stage(states.STARTED, action(actions.ERROR_OCCURRED))).toEqual(states.STOPPED);
    });
    it('Engine initialized with token, and market', () => {
        expect((state = stage(state, action(actions.INITIALIZE)))).toEqual(states.INITIALIZED);
    });
    it('Engine started', () => {
        expect((state = stage(state, action(actions.START)))).toEqual(states.STARTED);
    });
    it('All requested proposals are ready', () => {
        expect((state = stage(state, action(actions.RECEIVE_PROPOSALS)))).toEqual(states.PROPOSALS_READY);
    });
    it('Purchase failed', () => {
        expect((state = stage(state, action(actions.PURCHASE_FAILED)))).toEqual(states.STARTED);
    });
    it('Purchase succeeded', () => {
        expect((state = stage(state, action(actions.PURCHASE_SUCCEEDED)))).toEqual(states.SUCCESSFUL_PURCHASE);
    });
    it('Open contract received', () => {
        expect((state = stage(state, action(actions.OPEN_CONTRACT_RECEIVED)))).toEqual(states.OPEN_CONTRACT);
    });
    it('Sell succeeded', () => {
        expect((state = stage(state, action(actions.SELL_SUCCEEDED)))).toEqual(states.INITIALIZED);
    });
});
