export const getDispatchFromAction = ({ action, state, args }) => {
    const dispatch = jest.fn();
    const thunk = action(args);
    if (typeof thunk === 'function') {
        thunk(dispatch, () => state);
    } else {
        dispatch(thunk);
    }
    return dispatch;
};

export const toBeCalledWith = args => expect(getDispatchFromAction(args)).toBeCalledWith(args.calledWith);

export const notToBeCalled = args => expect(getDispatchFromAction(args)).not.toBeCalled();
