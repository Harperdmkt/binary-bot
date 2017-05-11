import { Map } from 'immutable';
import { createScope } from '../CliTools';
import * as constants from './constants';
import Bot from './';

describe('bot api', () => {
    const bot = new Bot(createScope());

    it('ASYNC: bot can be initialized with scope', async () => {
        const options = { symbol: 'R_100' };
        const token = 'Xkq6oGFEHh6hJH8';
        await bot.init(token, options);
        const { stage } = bot.store.getState();
        expect(stage).toEqual({ name: constants.INITIALIZED, data: new Map({ token, options }) });
    });

    it('bot start should wait for the ticks and balance', () => {
        bot.start({});
        const { stage } = bot.store.getState();
        expect(stage).toEqual({ name: constants.STARTED });
    });
});
