import createStore from './createStore';
import init from './actors/init';
import start from './actors/start';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = createStore();
    }
    async init(initData) {
        await init({ initData, store: this.store });
    }
    // eslint-disable-next-line class-methods-use-this
    start(tradeOption) {
        start(tradeOption);
    }
}

export default Bot;
