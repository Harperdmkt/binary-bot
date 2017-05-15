import reducer from './';

describe('Bot reducers', () => {
    it('should change state to initialized on init action', () => {
        expect(reducer({ stage: 'stop' }, { type: 'init' })).toEqual({ stage: 'initialized' });
    });
});
