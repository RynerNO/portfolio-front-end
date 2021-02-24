import { SET_PROJECTS } from './actions'
export default {
  [SET_PROJECTS]: (state, data) => {

    state.items = data;
  }
  
}