import React, { useState, useEffect } from "react";
import './App.css';
import { MovieComponent } from './components/Movie';
import Total from './styled-components/Total';
import Loading from './styled-components/Loading';
import Error from './styled-components/Error';

export const App = () => {
  const [data, setData] = useState([]);
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Initial fetch
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://swapi.dev/api/films/');
        console.log(response);
        if (!response.ok) throw Error(response.statusText);
        const json = await response.json();
        setData(json.results);
      }catch(e){
        setError('Failed to fetch');
      }
    };
    fetchData();
  }, []); // empty dependency array so no updates causes this effect to execute again
  
  useEffect(() => {
     if (data.length) {
       console.log('fetched data:', data);
       setVotes(data.map(item=>({episode_id:item.episode_id, votes:0})));
     }
  },[data]);
  
  // Both our data arrays are ready, we can remove the loading label
  useEffect(() => {
     if (votes.length) {
       setLoading(false);
       console.log('votes:', votes);
     }
  },[votes]);

  const handleVote = (episode_id) => {
    const clonedVotes = [...votes];
    clonedVotes.find(movie=>movie.episode_id === episode_id).votes++;
    setVotes(clonedVotes);
  }

  return (
    <div className="App">
        <header className="App-header">
          <h1>Star Wars ratings</h1>
        </header>
        <main>
          {error
            ? <Error>Error occured.</Error>
            : loading
              ? <Loading>Loading ...</Loading>
              : data.map(movie => (
                <MovieComponent
                  title={movie.title}
                  releaseDate={movie.release_date}
                  episodeId={movie.episode_id}
                  votes={votes.find(item=>item.episode_id === movie.episode_id).votes}
                  voteHandler={(episodeId) => handleVote(episodeId)}
                  key={movie.episode_id}>
                </MovieComponent>
              ))
          }
          <Total>
            <dt>Total number of votes</dt>
            <dd>{votes.reduce((sum, i) => sum + i.votes, 0)}</dd>
          </Total>
        </main>
      </div>
  );
};
//
/* class App extends Component {
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
*/