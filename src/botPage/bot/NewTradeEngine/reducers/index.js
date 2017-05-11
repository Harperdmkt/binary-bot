import { combineReducers } from 'redux';
import initData from './initData';
import tickSignal from './tickSignal';
import balance from './balance';
import contract from './contract';
import proposal from './proposal';
import stage from './stage';

export default combineReducers({
    initData,
    tickSignal,
    balance,
    stage,
    proposal,
    contract,
});
