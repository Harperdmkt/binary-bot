import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createScope } from '../CliTools';
import rootReducer from './reducers/';

const customCreateStore = () => createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(createScope())));

export default customCreateStore;
