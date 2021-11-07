import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getTopBannerAction } from "../../store/actionCreators";

import { Carousel } from 'antd';
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style';

export default memo(function HTopBanner() {
  // state
  const [currentIndex, setCurretnIndex] = useState(0);

  // 组件和redux关联获取数据和操作数据（借助react-redux中的hooks）
  const { topBanners } = useSelector(state => ({
    // topBanners: state.get("recommend").get("topBanners")
    topBanners: state.getIn(["recommend", "topBanners"])
  }), shallowEqual /*默认===比较返回值，修改shallowEqual为浅层比较 */);

  // 其它hooks
  const bannerRef = new useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurretnIndex(to)
    }, 0)
  }, []);

  // 其它业务代码
  const bgImage = topBanners[currentIndex]?.imageUrl + "?imageView&blur=40x20";

  return (
    <BannerWrapper bgImage={ bgImage }>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={ bannerRef } beforeChange={ bannerChange }>
            {
              topBanners.map((item, index) => {
                return (
                  <div key={item.imageUrl} className="banner-item">
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <div className="btn left" onClick={ e => bannerRef.current.prev() }></div>
          <div className="btn right" onClick={ e => bannerRef.current.next() }></div>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})


// function HRecommend(props) {
//   const { getBanners, topBanners } = props;
//   useEffect(() => {
//     getBanners();
//   }, [getBanners])
//   return (
//     <div>
//       HRecommend: {topBanners.length}
//     </div>
//   )
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// })
// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction());
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(HTopBanner))
