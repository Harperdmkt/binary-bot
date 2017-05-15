import * as actions from '../actions';
import * as states from '../states';
import reducer from './';

describe('Bot reducers', () => {
    it('should change state to initialized on init action', () => {
        expect(reducer({ stage: states.stopped }, { type: actions.init })).toEqual({ stage: states.initialized });
    });
});
