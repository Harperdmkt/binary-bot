import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import { tradeOptionToProposal, doUntilDone, getUUID } from '../../../tools';

const requestProposals = tradeOption => (dispatch, getState, { api }) => {
    const { proposalStage } = getState();
    if (proposalStage === states.WAITING_FOR_TRADE_OPTION) {
        return;
    }
    tradeOptionToProposal(tradeOption).map(proposal =>
        doUntilDone(() =>
            api.subscribeToPriceForContractProposal({
                ...proposal,
                passthrough: {
                    contractType: proposal.contract_type,
                    uuid        : getUUID(),
                },
            })
        )
    );

    api.events.on('proposal', r => {
        const { proposal, passthrough } = r;
        dispatch({
            type: actions.UPDATE_PROPOSAL,
            data: {
                ...proposal,
                ...passthrough,
            },
        });
    });
};

export default requestProposals;
