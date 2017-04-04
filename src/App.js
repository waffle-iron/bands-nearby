import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
// import AsynchRoute from './AsynchRoute'
import { BrowserRouter, Match, Miss } from 'react-router'

if (global) {
  global.System = {import () {}}
}

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Match
          exactly pattern='/'
          component={Main} />
          {/* component={(props) => <AsynchRoute props={props}
          loadingPromise={System.import('./Main')} />

        } /> */}
        {/* <Miss component={Main} /> */}
      </div>
    </Provider>
  )
}


export default App
