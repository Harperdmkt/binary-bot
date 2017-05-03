import { combineReducers } from 'redux';
import signal from './signal';
import proposals from './proposals';

export default combineReducers({
    signal,
    proposals,
});
