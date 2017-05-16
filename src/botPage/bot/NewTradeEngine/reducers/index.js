import { combineReducers } from 'redux';
import initData from './initData';
import lastTick from './lastTick';
import balance from './balance';
import contract from './contract';
import proposal from './proposal';
import stage from './stage';

export default combineReducers({
    initData,
    lastTick,
    balance,
    stage,
    proposal,
    contract,
});
