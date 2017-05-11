import { Map } from 'immutable';
import { createScope } from '../CliTools';
import * as constants from './constants';
import Bot from './';

describe('bot api', () => {
    const bot = new Bot(createScope());

    const options = { symbol: 'R_100' };
    const token = 'Xkq6oGFEHh6hJH8';
    const data = new Map({ token, options });

    it('ASYNC: bot can be initialized with scope', async () => {
        await bot.init(token, options);
        const { stage } = bot.store.getState();
        expect(stage).toEqual({ name: constants.INITIALIZED, data });
    });

    it('bot start should wait for the ticks and balance', () => {
        bot.start({});
        const { stage } = bot.store.getState();
        expect(stage).toEqual({ name: constants.STARTED, data });
    });
});
