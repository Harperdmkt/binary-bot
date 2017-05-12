import { Map } from 'immutable';
import initData from './';
import * as constants from '../../constants';

describe('initData reducer', () => {
    let state;
    it('initData should be empty', () => {
        expect((state = initData(state, { type: constants.INVALID }))).toEqual(new Map());
    });
    it('INIT_DATA should set initData', () => {
        expect((state = initData(state, { type: constants.INIT_DATA, data: new Map({ someData: true }) }))).toEqual(
            new Map({ someData: true })
        );
    });
});
