import React, { memo } from 'react'

import HThemeHeaderRecommend from '@/components/theme-header-recommend';

import { HotRecommendWrapper } from './style';

export default memo(function index() {
  return (
    <HotRecommendWrapper>
      <HThemeHeaderRecommend title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]} />
    </HotRecommendWrapper>
  )
})
