import signal from './signal';
import * as constants from '../constants';

let state;

describe('signal reducers', () => {
    it('initial state', () => {
        expect((state = signal(undefined, { type: constants.INVALID_ACTION }))).toEqual({
            stage: constants.STOP,
        });
    });
    it('START fired', () => {
        expect((state = signal(undefined, { type: constants.START }))).toEqual({
            stage: constants.BEFORE_PURCHASE,
        });
    });
    it('PURCHASE_SUCCESSFUL fired', () => {
        expect((state = signal(state, { type: constants.PURCHASE_SUCCESSFUL }))).toEqual({
            stage       : constants.DURING_PURCHASE,
            openContract: false,
        });
    });
    it('OPEN_CONTRACT fired', () => {
        expect((state = signal(state, { type: constants.OPEN_CONTRACT }))).toEqual({
            stage       : constants.DURING_PURCHASE,
            openContract: true,
        });
    });
    it('SOLD fired', () => {
        expect((state = signal(state, { type: constants.SELL }))).toEqual({
            stage: constants.STOP,
        });
    });
});
