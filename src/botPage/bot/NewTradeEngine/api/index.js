class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = {};
    }
    async init({ token, options }) {
        this.store = { stage: 'INITIALIZED', token, options };
    }
    getState() {
        return this.store.getState();
    }
}

export default Bot;
