import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getNewAlbumAction } from '../../store/actionCreators';
import { NEW_ALBUM_PAGE_NUM, NEW_ALBUM_PER_PAGE} from '@/common/contants';

import { Carousel} from 'antd';
import HAlbumCover from '@/components/album-cover';
import HThemeHeaderRecommend from '@/components/theme-header-recommend';
import { AlbumWrapper } from './style';

export default memo(function HNewAblyum() {
  // state

  // redux hooks
  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }))
  const dispatch = useDispatch();
  
  // other hooks
  const pageRef = new useRef();
  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_PAGE_NUM * NEW_ALBUM_PER_PAGE));
  }, [dispatch]);
  // others

  return (
    <AlbumWrapper>
      <HThemeHeaderRecommend title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={ e => pageRef.current.prev() }
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map(item => {
                return (
                  <div className="page" key={item}>
                    {
                      newAlbums
                        .slice(item * NEW_ALBUM_PER_PAGE, (item + 1) * NEW_ALBUM_PER_PAGE)
                        .map((iten, index) => {
                          return (
                            <HAlbumCover key={iten.id} info={iten} width={118} size={100} bgp="-570px"/>
                          )
                        })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={ e => pageRef.current.next() }
        ></button>
      </div>
    </AlbumWrapper>
  )
})
