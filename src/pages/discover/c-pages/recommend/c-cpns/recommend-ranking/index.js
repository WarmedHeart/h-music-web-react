import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getTopListAction } from '../../store/actionCreators'

import HThemeHeaderRecommend from '@/components/theme-header-recommend';
import HTopRanking from '@/components/top-ranking';
import { RankingWrapper } from './style';

export default memo(function HRecommendRanking() {
  // state

  //redux hooks
  const { upRanking, newRanking, originRanking } = useSelector(state => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"]),
  }), shallowEqual);
  const dispatch = useDispatch();
  //other hooks
  useEffect(() => {
    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  }, [dispatch])
  //others
  return (
    <RankingWrapper>
      <HThemeHeaderRecommend title="榜单" />
      <div className="tops">
        <HTopRanking info={upRanking}/>
        <HTopRanking info={newRanking}/>
        <HTopRanking info={originRanking}/>
      </div>
    </RankingWrapper>
  )
})
