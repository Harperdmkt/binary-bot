import { createScope } from '../../../CliTools';
import * as constants from '../../constants';
import requestTicks from './requestTicks';

describe('init actions', () => {
    describe('request ticks async', () => {
        let action;
        beforeAll(done => {
            requestTicks('R_100')(
                a => {
                    action = a;
                    done();
                },
                () => ({ init: { tickStreamReady: false } }),
                createScope()
            );
        });
        it('requestTicks should dispatch TICKS_RECEIVED', () => {
            expect(action).toEqual({ type: constants.TICKS_RECEIVED });
        });
    });
});
