import { createStore } from 'redux';
import reducers from './reducers';
import init from './actors/init';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = createStore(reducers);
    }
    async init(initData) {
        const action = await init({ initData, state: this.store.getState() });
        this.store.dispatch(action);
    }
}

export default Bot;
