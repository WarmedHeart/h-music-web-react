import React, { memo } from 'react'

import { RecommmendWrapper } from './style';
import HTopBanner from "./c-cpns/top-banner";

function HRecommend(props) {

  return (
    <RecommmendWrapper>
      <HTopBanner></HTopBanner>
    </RecommmendWrapper>
  )
}

export default memo(HRecommend);
