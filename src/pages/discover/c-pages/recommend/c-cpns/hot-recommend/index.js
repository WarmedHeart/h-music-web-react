import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { HOT_RECOMMEND_LIMIT } from '@/common/contants';

import HThemeHeaderRecommend from '@/components/theme-header-recommend';

import { HotRecommendWrapper } from './style';
import { getHotBannerAction } from '../../store/actionCreater';

export default memo(function HHotRecommend() {
  // state
  
  // redux hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual)

  const dispatch = useDispatch();

  // other hooks
  useEffect(() => {
    dispatch(getHotBannerAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch])

  // others
  
  return (
    <HotRecommendWrapper>
      <HThemeHeaderRecommend title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]} />
      {
        hotRecommends.map((item, index) => (
          <div key={item.id}>
            {item.name}
          </div>
        ))
      }
    </HotRecommendWrapper>
  )
})
