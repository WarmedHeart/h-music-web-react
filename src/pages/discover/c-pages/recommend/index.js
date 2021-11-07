import React, { memo } from 'react'

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style';
import HTopBanner from "./c-cpns/top-banner";
import HHotRecommend from "./c-cpns/hot-recommend";
import HNewAbbum from './c-cpns/new-album';
import HRecommendRanking from './c-cpns/recommend-ranking';

function HRecommend(props) {

  return (
    <RecommendWrapper>
      <HTopBanner></HTopBanner>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HHotRecommend />
          <HNewAbbum />
          <HRecommendRanking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(HRecommend);
