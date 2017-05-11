import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import * as constants from './constants';
import { init, start } from './actions/stage';
import { tick, balance } from './actions/init';

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
        this.store.dispatch(tick(options.symbol));
        this.store.dispatch(balance(token));
        await stateConditionPromise(this.store, state => state.tickSignal && state.balance.get('balance'));
        this.store.dispatch(init({ token, options }));
        return stateConditionPromise(this.store, state => state.stage.name === constants.INITIALIZED);
    }
    start() {
        this.store.dispatch(start());
    }
}
