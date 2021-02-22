import React, { Component } from "react";
import './App.css';
import Movie from './components/Movie';
import Total from './styled-components/Total';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const response = await fetch('https://swapi.dev/api/films/');
    const json = await response.json();
    this.setState({
      data: Object.values(
        json.results
          .sort((a,b) => new Date(a.release_date) - new Date(b.release_date))
          .map(obj=> ({ ...obj, votes: 0 }))
        )
    });
  }
  
  handleVote(episodeId){
    const clonedData = [...this.state.data];
    clonedData.find(movie=>movie.episode_id === episodeId).votes++
    this.setState({clonedData})
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1>Star Wars ratings</h1>
        </header>
        <main>
          {this.state.data.map(movie => (
            <Movie
              title={movie.title}
              releaseDate={movie.release_date}
              episodeId={movie.episode_id}
              votes={movie.votes}
              voteHandler={(episodeId) => this.handleVote(episodeId)}>
            </Movie>
          ))}
          <Total>
            <dt>Total number of votes</dt>
            <dd>{this.state.data.reduce((sum, i) => sum + i.votes, 0)}</dd>
          </Total>
        </main>
      </div>
    );
  }
}

export default App;
