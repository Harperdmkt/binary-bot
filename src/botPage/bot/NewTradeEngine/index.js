import createStoreWithScope from './createStoreWithScope';
import initializer from './actors/initializer';
import starter from './actors/starter';
import proposalMaker from './actors/proposalMaker';
import watcher from './actors/watcher';
import purchaser from './actors/purchaser';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = createStoreWithScope(this.$scope);
    }
    async init(token, initOptions) {
        const data = { token, initOptions };
        await initializer({ data, store: this.store });
    }
    /* eslint-disable class-methods-use-this */
    start(data) {
        const { initData: { initOptions } } = this.store.getState();
        const arg = { data: { ...data, ...initOptions }, store: this.store };
        starter(arg);
        proposalMaker(arg);
    }
    watch(name) {
        return watcher({ store: this.store, name });
    }
    purchase(data) {
        return purchaser({ store: this.store, data });
    }
    /* eslint-enable */
}

export default Bot;
