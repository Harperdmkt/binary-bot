import tickSignal from './tickSignal';
import * as constants from '../constants';

describe('tickSignal reducer', () => {
    let state;
    it('tickSignal should be falsy', () => {
        expect((state = tickSignal(state, { type: constants.INVALID }))).toBeFalsy();
    });
    it('TICK_SIGNAL should set tickSignal to truethy', () => {
        expect((state = tickSignal(state, { type: constants.TICK_SIGNAL, data: new Date().getTime() }))).toBeTruthy();
    });
});
