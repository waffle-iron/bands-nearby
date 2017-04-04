import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'
import './css/normalize.css';
import './css/App.css';


const App = React.createClass({
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <Match exactly pattern='/' component={Main} />
            <Miss component={Main} />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
})

render(<App />, document.getElementById('root'));
