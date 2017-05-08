import stage from './';
import * as constants from '../../constants';

const action = type => ({ type });

describe('Stage Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = stage(state, action(constants.INVALID)))).toEqual(constants.STOP);
    });
    it('Engine initialized with token, and market', () => {
        expect((state = stage(state, action(constants.INITIALIZE)))).toEqual(constants.INITIALIZED);
    });
    it('Engine started', () => {
        expect((state = stage(state, action(constants.START)))).toEqual(constants.STARTED);
    });
    it('All requested proposals are ready', () => {
        expect((state = stage(state, action(constants.PROPOSALS_RECEIVED)))).toEqual(constants.PROPOSALS_READY);
    });
    it('Purchase failed', () => {
        expect((state = stage(state, action(constants.PURCHASE_FAILED)))).toEqual(constants.STARTED);
    });
    it('Purchase succeeded', () => {
        expect((state = stage(state, action(constants.PURCHASE_SUCCEEDED)))).toEqual(constants.SUCCESSFUL_PURCHASE);
    });
    it('Open contract received', () => {
        expect((state = stage(state, action(constants.OPEN_CONTRACT_RECEIVED)))).toEqual(constants.OPEN_CONTRACT);
    });
    it('Sell succeeded', () => {
        expect((state = stage(state, action(constants.SELL_SUCCEEDED)))).toEqual(constants.STOP);
    });
});
