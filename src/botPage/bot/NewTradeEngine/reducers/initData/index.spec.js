import { Map } from 'immutable';
import initData from './';
import * as actions from '../actions';

describe('initData reducer', () => {
    let state;
    it('initData should be empty', () => {
        expect((state = initData(state, { type: actions.INVALID }))).toEqual(new Map());
    });
    it('actions.INIT_DATA should set initData', () => {
        expect((state = initData(state, { type: actions.INIT_DATA, data: new Map({ someData: true }) }))).toEqual(
            new Map({ someData: true })
        );
    });
});
