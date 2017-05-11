import { doUntilDone } from '../../../../tools';

export const requestBalance = async (token, $scope) => {
    const { api } = $scope;

    const authPromise = new Promise(resolve => api.events.on('authorize', resolve));

    const balancePromise = new Promise(resolve =>
        api.events.on('balance', r => {
            const { balance: { balance: b, currency } } = r;

            resolve({ balance: Number(b).toFixed(2), currency });
        })
    );

    doUntilDone(() => api.authorize(token)).catch(e => {
        throw e;
    });

    await authPromise;

    doUntilDone(() => api.subscribeToBalance()).catch(e => {
        throw e;
    });

    return balancePromise;
};

let tickListenerKey;
let currentSymbol;

export const requestTicks = async (symbol, $scope) => {
    if (!symbol || currentSymbol === symbol) {
        return Promise.resolve(true);
    }
    const { ticksService } = $scope;

    ticksService.stopMonitor({
        symbol: currentSymbol,
        key   : tickListenerKey,
    });

    const tickStreamPromise = new Promise(resolve => {
        const key = ticksService.monitor({
            symbol,
            callback() {
                resolve(true);
            },
        });

        currentSymbol = symbol;

        tickListenerKey = key;
    });
    return tickStreamPromise;
};
