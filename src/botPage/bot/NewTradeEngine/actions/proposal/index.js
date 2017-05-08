import * as constants from '../../constants';

const isTradeOptionTheSame = (oldOpt, newOpt) =>
    ['duration', 'amount', 'prediction', 'barrierOffset', 'secondBarrierOffset'].every(
        field => oldOpt[field] === newOpt[field]
    );

export const makeProposals = newOpt => (dispatch, getState) => {
    const { proposal: { proposals: { tradeOption: oldOpt } } } = getState();
    if (!isTradeOptionTheSame(oldOpt, newOpt)) {
        dispatch({
            type: constants.ADD_TRADE_OPTION,
            data: newOpt,
        });
    }
};

export const updateProposal = ({ proposal, passthrough }) => (dispatch, getState) => {
    const { proposal: { proposals: { forgottenProposals } } } = getState();
    const { uuid } = passthrough;

    if (!forgottenProposals.includes(uuid)) {
        dispatch({
            type: constants.UPDATE_PROPOSAL,
            data: {
                ...proposal,
                ...passthrough,
            },
        });
    }
};

export const proposalsReady = () => (dispatch, getState) => {
    const { proposal: { proposals: { tradeOption, proposalPayloads } } } = getState();

    if (tradeOption.contractTypes.length === proposalPayloads.size) {
        dispatch({ type: constants.PROPOSALS_READY });
    }
};

export const clearAllProposals = () => ({
    type: constants.CLEAR_ALL_PROPOSALS,
});

export const proposalsNotReady = () => ({
    type: constants.PROPOSALS_NOT_READY,
});

export const addForgottenProposalId = id => ({
    type: constants.ADD_FORGOTTEN_PROPOSAL_ID,
    data: id,
});

export const removeForgottenProposalId = id => ({
    type: constants.REMOVE_FORGOTTEN_PROPOSAL_ID,
    data: id,
});
