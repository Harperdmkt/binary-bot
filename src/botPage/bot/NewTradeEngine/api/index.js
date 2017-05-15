import * as states from '../states';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = {
            getState() {
                return this.state;
            },
        };
    }
    init({ token, options }) {
        this.store.state = { stage: states.initialized, token, options };
    }
    getState() {
        return this.store.getState();
    }
}

export default Bot;
