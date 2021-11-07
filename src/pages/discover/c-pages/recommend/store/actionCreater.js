import * as actionTypes from './constants';

import {
  getTopBanners,
  getHotRecommends
} from "@/services/recommend";

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})
const changeHotBannerAction = (res) => ({
  type: actionTypes.CHANGE_HOT_BANNERS,
  hotRecommends: res.result
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
