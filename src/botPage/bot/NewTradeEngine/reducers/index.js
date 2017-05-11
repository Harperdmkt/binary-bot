import { combineReducers } from 'redux';
import tickSignal from './tickSignal';
import balance from './balance';
import contract from './contract';
import proposal from './proposal';
import stage from './stage';

export default combineReducers({
    tickSignal,
    balance,
    stage,
    proposal,
    contract,
});
