import { translate } from '../../../common/i18n';
import { recoverFromError } from '../tools';
import { info, notify } from '../broadcast';
import { purchaseSuccessful } from './actions';
import { BEFORE_PURCHASE } from './constants';

let delayIndex = 0;

export default Engine => class Purchase extends Engine {
    purchase(contractType) {
        // Prevent calling purchase twice
        if (this.store.getState().signal.stage !== BEFORE_PURCHASE) {
            return Promise.resolve();
        }

        const { id, askPrice } = this.selectProposal(contractType);

        return recoverFromError(
            () => this.api.buyContract(id, askPrice),
            (errorCode, makeDelay) => {
                // if disconnected no need to resubscription (handled by live-api)
                if (errorCode !== 'DisconnectError') {
                    this.renewProposalsOnPurchase();
                } else {
                    this.clearProposals();
                }

                const unsubscribe = this.store.subscribe(() => {
                    const { signal: { stage }, proposals: { proposalsReady } } = this.store.getState();
                    if (stage === BEFORE_PURCHASE && proposalsReady) {
                        makeDelay().then(() => this.observer.emit('REVERT', 'before'));
                        unsubscribe();
                    }
                });
            },
            ['PriceMoved'],
            delayIndex++
        ).then(r => {
            const { buy } = r;

            this.subscribeToOpenContract(buy.contract_id);
            this.store.dispatch(purchaseSuccessful());
            this.renewProposalsOnPurchase();
            delayIndex = 0;
            notify('info', `${translate('Bought')}: ${buy.longcode}`);
            info({
                totalRuns      : this.updateAndReturnTotalRuns(),
                transaction_ids: { buy: buy.transaction_id },
                contract_type  : contractType,
                buy_price      : buy.buy_price,
            });
        });
    }
};
