import Bot from './';

describe('Bot API', () => {
    const bot = new Bot({});
    describe('Bot init (async)', () => {
        it('should change the stage to be initialized', () => {
            bot.init();
            const { stage } = bot.getState();
            expect(stage).toEqual('initialized');
        });
    });
});
