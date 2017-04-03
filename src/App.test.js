import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => { return { matches: true } })
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
