import React from 'react';
import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
 
import {App} from './App';
 
describe('App', () => {
  
  test('renders App component', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test('Shows error when 500 from API', async () => {
    let _body;
    const scope = nock('https://swapi.dev')
      .get('/api/films/')
      .reply(500);
    
    render(<App />);
    await waitFor(() => screen.getByText('Error occured.'))
  });
  
});
