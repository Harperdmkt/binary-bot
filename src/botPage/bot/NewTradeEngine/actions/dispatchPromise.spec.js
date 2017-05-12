import dispatchPromise from './dispatchPromise';

const action = data => dispatch => setTimeout(() => dispatch(data), 1000);

describe('dispatchPromise', () => {
    it('should return promise and dispatch', () => {
        const { dispatch, promise } = dispatchPromise();
        expect(typeof dispatch).not.toEqual('undefined');
        expect(typeof promise).not.toEqual('undefined');
    });
    it('should resolve the promise with dispatch arg', async () => {
        const { dispatch, promise } = dispatchPromise();
        const arg = { test: 'test String' };

        action(arg)(dispatch);

        const calledWith = await promise;

        expect(calledWith).toEqual(arg);
    });
});
