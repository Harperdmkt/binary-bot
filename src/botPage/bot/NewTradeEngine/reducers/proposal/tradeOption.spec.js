import tradeOption from './tradeOption';
import * as constants from '../../constants';

let state;

describe('tradeOption reducers', () => {
    it('initial state', () => {
        expect((state = tradeOption(undefined, { type: constants.INVALID_ACTION }))).toEqual({});
    });
    it('ADD_TRADE_OPTION fired', () => {
        expect(
            (state = tradeOption(state, {
                type: constants.ADD_TRADE_OPTION,
                data: { contract_type: 'CALL' },
            }))
        ).toEqual({ contract_type: 'CALL' });
    });
    it('ADD_TRADE_OPTION for new tradeOption fired', () => {
        expect(
            (state = tradeOption(state, {
                type: constants.ADD_TRADE_OPTION,
                data: { contract_type: 'PUT' },
            }))
        ).toEqual({ contract_type: 'PUT' });
    });
});
