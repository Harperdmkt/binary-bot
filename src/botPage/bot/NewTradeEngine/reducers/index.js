import { combineReducers } from 'redux';
import initData from './initData';
import tradeOption from './tradeOption';
import lastTick from './lastTick';
import balance from './balance';
import contract from './contract';
import proposalStage from './proposalStage';
import stage from './stage';

export default combineReducers({
    initData,
    tradeOption,
    lastTick,
    balance,
    stage,
    proposalStage,
    contract,
});
