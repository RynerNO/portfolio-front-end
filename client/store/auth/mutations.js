import { SET_AUTH, UNSET_AUTH } from './actions';

export default {
  [SET_AUTH](state, { user, token }) {
    state.user = user;
    state.token = token;
    state.status = true;
  },
  [UNSET_AUTH](state) {
    state.user = null;
    state.token = null;
    state.status = false;
  }
};
