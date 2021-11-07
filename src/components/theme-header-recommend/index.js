import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { HeaderWrapper } from './style';

const HThemeHeaderRecommend = memo(function(props) {
  const { title, keywords } = props;
  
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keyword">
          {
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <a href="todo">{item}</a>
                  <span className="divider">{ index !== keywords.length - 1 ? '|' : ''} </span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <a href="todo">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
});

HThemeHeaderRecommend.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array
};

HThemeHeaderRecommend.defaultProps = {
  keywords: []
};

export default HThemeHeaderRecommend;

