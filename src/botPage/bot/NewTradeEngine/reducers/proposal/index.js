import { combineReducers } from 'redux';
import proposalPayloads from './proposalPayloads';
import tradeOption from './tradeOption';
import forgottenProposals from './forgottenProposals';
import proposalsReady from './proposalsReady';

export default combineReducers({
    tradeOption,
    proposalsReady,
    proposalPayloads,
    forgottenProposals,
});
