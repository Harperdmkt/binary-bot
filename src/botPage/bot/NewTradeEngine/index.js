import createStore from './createStore';
import initializer from './actors/initializer';
import starter from './actors/starter';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = createStore();
    }
    async init(initData) {
        await initializer({ initData, store: this.store });
    }
    // eslint-disable-next-line class-methods-use-this
    start(tradeOption) {
        starter(tradeOption);
    }
}

export default Bot;
