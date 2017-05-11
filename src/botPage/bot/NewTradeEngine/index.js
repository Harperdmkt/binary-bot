import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import * as constants from './constants';
import { init, start } from './actions/stage';

export default class Bot {
    constructor($scope) {
        this.store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument($scope)));
    }
    init(token, options) {
        this.store.dispatch(init(token, options));
        return new Promise(resolve => {
            const unsubscribe = this.store.subscribe(() => {
                const { stage: { name } } = this.store.getState();
                if (name === constants.INITIALIZED) {
                    resolve();
                    unsubscribe();
                }
            });
        });
    }
    start() {
        this.store.dispatch(start());
    }
}
