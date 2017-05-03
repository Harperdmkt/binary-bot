import { translate } from '../../../common/i18n';
import { tradeOptionToProposal, doUntilDone, getUUID } from '../tools';
import { error as broadcastError } from '../broadcast';
import * as actions from './actions/proposals';

export default Engine => class Proposal extends Engine {
    makeProposals(tradeOption) {
        this.store.dispatch(actions.makeProposals(tradeOption));
        this.renewProposalsOnPurchase();
    }
    selectProposal(contractType) {
        const { proposalPayloads: proposals } = this.store.getState().proposals;

        if (!proposals.size) {
            throw translate('Proposals are not ready');
        }

        const toBuy = Array.from(proposals.values()).find(proposal => proposal.contractType === contractType);

        if (!toBuy) {
            throw translate('Selected proposal does not exist');
        }

        return {
            id      : toBuy.id,
            askPrice: toBuy.ask_price,
        };
    }
    renewProposalsOnPurchase() {
        this.requestProposals();
        this.unsubscribeProposals();
    }
    clearProposals() {
        this.store.dispatch(actions.clearAllProposals());
        this.store.dispatch(actions.proposalsNotReady());
    }
    requestProposals() {
        Promise.all(
            tradeOptionToProposal(this.store.getState().proposals.tradeOption).map(proposal =>
                doUntilDone(() =>
                    this.api.subscribeToPriceForContractProposal({
                        ...proposal,
                        passthrough: {
                            contractType: proposal.contract_type,
                            uuid        : getUUID(),
                        },
                    })
                )
            )
        ).catch(broadcastError);
    }
    observeProposals() {
        this.listen('proposal', r => this.store.dispatch(actions.updateProposal(r)));
    }
    unsubscribeProposals() {
        const { proposalPayloads: proposals } = this.store.getState().proposals;
        if (!proposals.size) {
            return;
        }

        this.clearProposals();

        Array.from(proposals.entries()).forEach(([uuid, { id }]) => {
            actions.addForgottenProposalId(uuid);

            doUntilDone(() => this.api.unsubscribeByID(id)).then(() => actions.removeForgottenProposalId(uuid));
        });
    }
    checkProposalReady() {
        this.startPromise.then(() => this.store.dispatch(actions.proposalsReady()));
    }
};
