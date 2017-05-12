const dispatchPromise = () => {
    let dispatch;

    const promise = new Promise(resolve => {
        dispatch = resolve;
    });

    return { promise, dispatch };
};

export default dispatchPromise;
