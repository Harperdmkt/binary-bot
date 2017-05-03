import proposalsReady from './proposalsReady';
import * as constants from '../../constants';

let state;

describe('proposalsReadyReady reducers', () => {
    it('initial state', () => {
        expect((state = proposalsReady(undefined, { type: constants.INVALID_ACTION }))).toEqual(false);
    });
    it('PROPOSALS_READY fired', () => {
        expect((state = proposalsReady(state, { type: constants.PROPOSALS_READY }))).toEqual(true);
    });
    it('PROPOSALS_NOT_READY fired', () => {
        expect((state = proposalsReady(state, { type: constants.PROPOSALS_NOT_READY }))).toEqual(false);
    });
});
