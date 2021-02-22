/*import React from 'react';
import ReactDOM from 'react-dom';
import nock from 'nock';
import { App } from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('Shows error when 500 from API', () => {
  const scope = nock('https://swapi.dev')
  .get('/api/films/')
  .reply(500);

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/


import React from 'react';
import nock from 'nock';
import { render, screen } from '@testing-library/react';
 
import {App} from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
  test('Shows error when 500 from API', () => {
    const scope = nock('https://swapi.dev')
      .get('/api/films/')
      .reply(500);
    
    render(<App />);
    
    screen.getByText('Error occured.');
  });
});

