const reducer = (state = { stage: 'stop' }, action) => {
    switch (action.type) {
        case 'init':
            return { stage: 'initialized' };
        default:
            return state;
    }
};
export default reducer;
