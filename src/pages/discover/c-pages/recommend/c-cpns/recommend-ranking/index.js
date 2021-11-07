import React, { memo } from 'react'

import HThemeHeaderRecommend from '@/components/theme-header-recommend';

import { RankingWrapper } from './style';

export default memo(function HRecommendRanking() {
  return (
    <RankingWrapper>
      <HThemeHeaderRecommend title="榜单" />
    </RankingWrapper>
  )
})
