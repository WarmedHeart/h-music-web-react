
import { getSongDetail, getLyric } from '@/services/player';
import * as actionType from './constants';
import { getRandomNumber } from '@/utils/math-utils';
import { parseLyric } from '@/utils/parse-lyric.js';

const changeCurrentSongAction = currentSong => ({
  type: actionType.CHANGE_CURRENT_SONG,
  currentSong
});

const changePlayListAction = playList => ({
  type: actionType.CHANGE_PLAY_LIST,
  playList
});

const changeCurrentSongIndexAction = index => ({
  type: actionType.CHANGE_CURRENT_SONG_INDEX,
  index
});

const changLyricListAction = (lyricList) => ({
  type: actionType.CHANGE_LYRIC_LIST,
  lyricList
})

// 对外暴露的action
export const changeSequenceAction = sequence => ({
  type: actionType.CHANGE_SEQUENCE,
  sequence
});

export const changeMusicAction = tab => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    const sequence = getState().getIn(["player", "sequence"]);
    const songsLength = playList.length;

    switch(sequence) {
      case 1: //随机播放
        let randomIndex = getRandomNumber(songsLength);
        while(randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(songsLength);
        }
        currentSongIndex = randomIndex;
        break;
      default:
        currentSongIndex = (currentSongIndex + tab) % songsLength;
        if (currentSongIndex < 0) currentSongIndex = songsLength - 1
    }
    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
    // 请求歌词
    dispatch(getLyricAction(currentSong.id));
  }
}
export const getSongDetailAction = ids => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(item => item.id === ids)

    let song = null;
    if (songIndex !== -1) { // 存在列表中
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeCurrentSongAction(song));
      // 请求歌词
      dispatch(getLyricAction(song.id));
    } else {  // 不存在
      // 请求歌曲详细数据
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0];
        if (!song) return;  //if song没有值
        // 将歌曲数据放入歌曲列表
        const newPlaySong = [...playList, song];
        dispatch(changePlayListAction(newPlaySong));
        // 修改当前播放下标
        dispatch(changeCurrentSongIndexAction(newPlaySong.length - 1));
        // 修改当前播放歌曲数据
        dispatch(changeCurrentSongAction(song));
        // 请求歌词
        dispatch(getLyricAction(song.id));
      })
    }
  }
};

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      console.log(res);
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changLyricListAction(lyricList));
    })
  }
}
