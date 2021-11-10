
import { getSongDetail } from '@/services/player';
import * as actionType from './constants';

const changeCurrentSongsAction = currentSong => ({
  type: actionType.CHANGE_CURRENT_SONG,
  currentSong
})
export const getSongDetailAction = ids => {
  return dispatch => {
    getSongDetail(1395624119).then(res => {
      dispatch(changeCurrentSongsAction(res.songs && res.songs[0]));
    })
  }
}