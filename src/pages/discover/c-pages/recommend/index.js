import React, { memo, useEffect } from 'react'
import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getTopBannerAction } from "./store/actionCreater";


function HRecommend(props) {
  // 组件和redux关联获取数据和操作数据（借助react-redux中的hooks）
  const { topBanners } = useSelector(state => ({
    topBanners: state.get("recommend").get("topBanners")
  }), shallowEqual);  // 默认===比较返回值，修改shallowEqual为浅层比较

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  return (
    <div>
      HRecommend: {topBanners.length}
    </div>
  )
}

export default memo(HRecommend);


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

// export default connect(mapStateToProps, mapDispatchToProps)(memo(HRecommend))
