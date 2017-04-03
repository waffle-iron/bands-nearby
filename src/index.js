import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'
import './css/normalize.css';
import './css/App.css';


const App = React.createClass({
  render () {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern='/' component={Main} />
          <Miss component={Main} />
        </div>
      </BrowserRouter>
    )
  }
})

render(<App />, document.getElementById('root'));
