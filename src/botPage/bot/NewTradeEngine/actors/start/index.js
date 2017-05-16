import * as actions from '../../constants/actions';
import requestProposals from '../../actions/requestProposals';

const start = ({ data, store }) => {
    store.dispatch(requestProposals(data));
    store.dispatch({ type: actions.START, data });
};

export default start;
