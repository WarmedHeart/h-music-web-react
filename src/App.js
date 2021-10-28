import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';

import routes from './router';

import HAppHeader from '@/components/app-header';
import HAppFooter from '@/components/app-footer';
import { HashRouter } from 'react-router-dom';

export default memo(function App() {
  return (
    <HashRouter>
      <HAppHeader />
        {renderRoutes(routes)}
      <HAppFooter />
    </HashRouter>
  )
})
