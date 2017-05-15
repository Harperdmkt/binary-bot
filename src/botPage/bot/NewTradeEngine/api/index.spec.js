import * as states from '../states';
import Bot from './';

describe('Bot API', () => {
    const bot = new Bot({});
    describe('Bot init', () => {
        it('should change the stage to be initialized', () => {
            const data = {
                token  : 'token',
                options: {},
            };
            bot.init(data);
            const state = bot.getState();
            expect(state).toEqual({ stage: states.initialized, ...data });
        });
    });
});
