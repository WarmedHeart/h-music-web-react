import { Map } from 'immutable';

import * as actionType from './constants';

const defaultState = Map({
  currentSong: {}
})

function reducer(state = defaultState, action) {
  switch(action.type) {
    case actionType.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    default:
      return state;
  }
}

export default reducer;
