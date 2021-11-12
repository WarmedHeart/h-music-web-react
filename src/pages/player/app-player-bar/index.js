import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  getSongDetailAction,
  changeSequenceAction,
  changeMusicAction
} from '../store/actionCreators';
import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';

import { Slider } from 'antd';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
export default memo(function HAppPlayerBar() {
  //state
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // redux hooks
  const { playList, currentSong, sequence } = useSelector(state => ({
    playList: state.getIn(["player", "playList"]),
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player", "sequence"])
  }))
  const dispatch = useDispatch();

  // other hooks
  const audioRef = useRef();
  useEffect(() => {
    dispatch(getSongDetailAction(1395624119))
  }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    })
  }, [currentSong])

  // others
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");

  // handle function
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause(): audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const changeSequence = useCallback(() => {
    const currentSequence = (sequence + 1) % 3;
    dispatch(changeSequenceAction(currentSequence));
  }, [dispatch, sequence]);
  
  const changeMusic = useCallback((tab) => {
    dispatch(changeMusicAction(tab));
  }, [dispatch])

  const sliderChange = useCallback((value) => {
    setIsChanging(true);
    const currentTime = value / 100 * duration;
    setCurrentTime(currentTime);
    setProgress(value);
  }, [duration])
  
  const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100 * duration / 1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime * 1000);
    setIsChanging(false);

    if (!isPlaying) {
      playMusic();
    }

  }, [duration, isPlaying, playMusic])

  const timeUpdate = function(e) {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(currentTime * 1000 / duration * 100);
    }
  }

  const handleMusicEnded = function(e) {
    if (sequence === 2 || playList.length === 1)  {  //单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
       dispatch(changeMusicAction(1));
    }
  }

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="prev sprite_player" onClick={e => changeMusic(-1)}></button>
          <button className="play sprite_player" onClick={e => playMusic()}></button>
          <button className="next sprite_player" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <img src={getSizeImage(picUrl, 35)} alt="" />
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="#/" className="singer-name">{singerName}</a>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              ></Slider>
              <span className="now-time">{showCurrentTime}</span>
              <span className="divider">/</span>
              <span className="duration">{showDuration}</span>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="btn favor sprite_player"></button>
            <button className="btn share sprite_player"></button>
          </div>
          <div className="right sprite_player">
            <button className="btn volume sprite_player"></button>
            <button className="btn loop sprite_player" onClick={e => changeSequence()}></button>
            <button className="btn playlist sprite_player"></button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={e => timeUpdate(e)}
        onEnded={e => handleMusicEnded(e)}
      />
    </PlaybarWrapper>
  )
})
