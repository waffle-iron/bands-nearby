import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => { return { matches: true } })
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
});
