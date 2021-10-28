import React, { memo } from 'react'

import HAppHeader from '@/components/app-header';
import HAppFooter from '@/components/app-footer';

export default memo(function App() {
  return (
    <div>
      <HAppHeader />
      main
      <HAppFooter />
    </div>
  )
})
