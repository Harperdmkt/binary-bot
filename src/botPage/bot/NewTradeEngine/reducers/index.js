import { combineReducers } from 'redux';
import initData from './initData';
import tradeOption from './tradeOption';
import lastTick from './lastTick';
import balance from './balance';
import contract from './contract';
import proposal from './proposal';
import stage from './stage';

export default combineReducers({
    initData,
    tradeOption,
    lastTick,
    balance,
    stage,
    proposal,
    contract,
});
