import * as actionTypes from './constants';

import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList
} from "@/services/recommend";

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

const changeHotBannerAction = (res) => ({
  type: actionTypes.CHANGE_HOT_BANNERS,
  hotRecommends: res.result
})

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ABLUMS,
  newAlbums: res.albums
})

const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist
})

const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})

const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

export const getTopBannerAction = () => {
  return dispatch => getTopBanners().then(res => {
    dispatch(changeTopBannerAction(res));
  })
}

export const getHotBannerAction = (limit) => {
  return dispatch => getHotRecommends(limit).then(res => {
    dispatch(changeHotBannerAction(res));
  })
}

export const getNewAlbumAction = (limit) => {
  return dispatch => getNewAlbums(limit).then(res => {
    dispatch(changeNewAlbumAction(res))
  })
}

export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res));
          break;
        case 2:
          dispatch(changeNewRankingAction(res));
          break;
        case 3:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  }
}
