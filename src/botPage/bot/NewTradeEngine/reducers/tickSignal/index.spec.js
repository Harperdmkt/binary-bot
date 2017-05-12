import tickSignal from './';
import * as actions from '../actions';

describe('tickSignal reducer', () => {
    let state;
    it('tickSignal should be falsy', () => {
        expect((state = tickSignal(state, { type: actions.INVALID }))).toBeFalsy();
    });
    it('actions.TICK_SIGNAL should set tickSignal to truethy', () => {
        expect((state = tickSignal(state, { type: actions.TICK_SIGNAL, data: new Date().getTime() }))).toBeTruthy();
    });
});
