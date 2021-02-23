import React from 'react';
import nock from 'nock';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
 
import {App} from './App';
 
describe('App', () => {
  
  test('renders App component', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test('Shows loading label by default', () => {
    render(<App />);
    screen.getByText('Loading ...');
  });

  test('Shows error when 500 from API', async () => {
    const scope = nock('https://swapi.dev')
      .persist().get('/api/films/')
      .reply(500, '', {'Access-Control-Allow-Origin': '*'});
    
    render(<App />);
    await waitFor(() => screen.getByText('An error occured - Internal Server Error'))
    nock.cleanAll()
  });

  test('Shows correct amount of received items', async () => {
    const scope = nock('https://swapi.dev')
      .persist().get('/api/films/')
      .reply(200, {
        "results": [
          {"title": "Mock1","episode_id": 1,"release_date": "2002-05-16"},
          {"title": "Mock2","episode_id": 2,"release_date": "2001-05-16"},
          {"title": "Oldest","episode_id": 3,"release_date": "1995-05-16"},
          {"title": "Mock3","episode_id": 4,"release_date": "2000-05-16"}
        ]
      }, {'Access-Control-Allow-Origin': '*'});
    
    render(<App />);
    await waitFor(() => screen.getByText('Mock1'));
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
    nock.cleanAll()
  });

  test('Shows oldest at the top', async () => {
    const scope = nock('https://swapi.dev')
      .persist().get('/api/films/')
      .reply(200, {
        "results": [
          {"title": "Mock1","episode_id": 1,"release_date": "2002-05-16"},
          {"title": "Mock2","episode_id": 2,"release_date": "2001-05-16"},
          {"title": "Oldest","episode_id": 3,"release_date": "1995-05-16"},
          {"title": "Mock3","episode_id": 4,"release_date": "2000-05-16"}
        ]
      }, {'Access-Control-Allow-Origin': '*'});
    
    render(<App />);
    const element = await screen.findByTestId('title#0');
    expect(element.textContent).toBe('Oldest');
    nock.cleanAll()
  });

  test('Shows correct amount of votes', async () => {
    const scope = nock('https://swapi.dev')
      .persist().get('/api/films/')
      .reply(200, {
        "results": [
          {"title": "Mock1","episode_id": 1,"release_date": "2002-05-16"},
          {"title": "Mock2","episode_id": 2,"release_date": "2001-05-16"},
          {"title": "Oldest","episode_id": 3,"release_date": "1995-05-16"},
          {"title": "Mock3","episode_id": 4,"release_date": "2000-05-16"}
        ]
      }, {'Access-Control-Allow-Origin': '*'});
    
    render(<App />);
    await screen.findByTestId('button#2');

    fireEvent.click(screen.getByTestId('button#2'));
    fireEvent.click(screen.getByTestId('button#2'));
    expect(screen.getByTestId('votes#2').textContent).toBe('2 votes');
    nock.cleanAll()
  });

  test('Shows correct amount of total votes', async () => {
    const scope = nock('https://swapi.dev')
      .persist().get('/api/films/')
      .reply(200, {
        "results": [
          {"title": "Mock1","episode_id": 1,"release_date": "2002-05-16"},
          {"title": "Mock2","episode_id": 2,"release_date": "2001-05-16"},
          {"title": "Oldest","episode_id": 3,"release_date": "1995-05-16"},
          {"title": "Mock3","episode_id": 4,"release_date": "2000-05-16"}
        ]
      }, {'Access-Control-Allow-Origin': '*'});
    
    render(<App />);
    await screen.findByTestId('button#2');

    fireEvent.click(screen.getByTestId('button#1'));
    fireEvent.click(screen.getByTestId('button#0'));
    fireEvent.click(screen.getByTestId('button#0'));
    fireEvent.click(screen.getByTestId('button#3'));
    fireEvent.click(screen.getByTestId('button#2'));
    expect(screen.getByTestId('totalVotes').textContent).toBe('5');
    nock.cleanAll()
  });
  
});
