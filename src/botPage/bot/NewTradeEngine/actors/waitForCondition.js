const waitForCondition = (store, condition) =>
    new Promise(resolve => {
        const unsubscribe = store.subscribe(() => {
            if (condition(store.getState())) {
                resolve();
                unsubscribe();
            }
        });
    });

export default waitForCondition;
