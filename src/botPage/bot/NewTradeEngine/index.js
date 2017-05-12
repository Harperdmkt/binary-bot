import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import * as states from './reducers/states';
import { start } from './actions/stage';
import initData from './actions/init';

const stateConditionPromise = (store, condition) =>
    new Promise(resolve => {
        const unsubscribe = store.subscribe(() => {
            if (condition(store.getState())) {
                resolve();
                unsubscribe();
            }
        });
    });

export default class Bot {
    constructor($scope) {
        this.store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument($scope)));
    }
    async init(token, options) {
        this.store.dispatch(initData({ token, options }));
        return stateConditionPromise(this.store, state => state.stage === states.INITIALIZED);
    }
    start() {
        this.store.dispatch(start());
    }
}
