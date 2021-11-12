import React, { memo, Suspense } from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';

import routes from './router';
import store from './store';

import HAppHeader from '@/components/app-header';
import HAppFooter from '@/components/app-footer';
import HAppPlayerBar from './pages/player/app-player-bar';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <HAppHeader />
        <Suspense fallback={<div>loading...</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <HAppFooter />
        <HAppPlayerBar />
      </HashRouter>
    </Provider>
  )
})
