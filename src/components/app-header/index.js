import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

export default memo(function HAppHeader() {
  return (
    <div>
      <NavLink to="/">音乐</NavLink>
      <NavLink to="/mine">我的</NavLink>
      <NavLink to="/friend">朋友</NavLink>
    </div>
  )
})
