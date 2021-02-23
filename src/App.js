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
		// console.log('fetch response:', response);
		if (!response.ok){
			throw response.statusText;
		}
        const json = await response.json();
        setData(json.results.sort((a,b) => new Date(a.release_date) - new Date(b.release_date)));
      }catch(e){
		// console.log(e);
        setError(e);
      }
    };
    fetchData();
  }, []); // empty dependency array so no updates causes this effect to execute again
  
  // Creating our votes array
  useEffect(() => {
     if (data.length) {
       setVotes(data.map(item=>({episode_id:item.episode_id, votes:0})));
     }
  },[data]);
  
  // Both our data arrays are ready, we can remove the loading label
  useEffect(() => {
     if (votes.length) {
       setLoading(false);
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
        <main role="list">
          {error
            ? <Error>An error occured - {error}</Error>
            : loading
              ? <Loading>Loading ...</Loading>
              : data.map((movie,index) => (
                <MovieComponent
                  title={movie.title}
                  releaseDate={movie.release_date}
                  episodeId={movie.episode_id}
                  votes={votes.find(item=>item.episode_id === movie.episode_id).votes}
                  voteHandler={(episodeId) => handleVote(episodeId)}
                  key={movie.episode_id}
				  testId={index}>
                </MovieComponent>
              ))
          }
          <Total>
            <dt>Total number of votes</dt>
            <dd data-testid="totalVotes">{votes.reduce((sum, i) => sum + i.votes, 0)}</dd>
          </Total>
        </main>
      </div>
  );
};
