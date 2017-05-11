import { combineReducers } from 'redux';
import init from './init';
import contract from './contract';
import proposal from './proposal';
import stage from './stage';

export default combineReducers({
    init,
    stage,
    proposal,
    contract,
});
