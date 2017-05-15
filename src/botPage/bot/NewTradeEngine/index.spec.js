import { createScope } from '../CliTools';
import * as states from './reducers/states';
import Bot from './';

describe('bot api', () => {
    const bot = new Bot(createScope());

    const options = { symbol: 'R_100' };
    const token = 'Xkq6oGFEHh6hJH8';

    it('ASYNC: bot can be initialized with scope', async () => {
        await bot.init(token, options);
        const { stage } = bot.store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });

    it('start should work after initialization', () => {
        bot.start({});
        const { stage } = bot.store.getState();
        expect(stage).toEqual(states.STARTED);
    });
});
