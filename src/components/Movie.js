import React, { Component } from 'react';
import Movie from '../styled-components/Movie';
import MovieMeta from '../styled-components/MovieMeta';
import Title from '../styled-components/Title';
import ReleaseDate from '../styled-components/ReleaseDate';
import MovieVotes from '../styled-components/MovieVotes';
import VoteButton from '../styled-components/VoteButton';
import VoteCount from '../styled-components/VoteCount';
import heart from '../icons/heart.svg';



class MovieComponent extends Component {
  
  
  render() {
    return(
      <Movie>
        <MovieMeta>
          <Title>{this.props.title}</Title>
          <ReleaseDate datetime={this.props.releaseDate}>
            {new Date(this.props.releaseDate).toLocaleDateString(undefined, { month: 'long',day: '2-digit', year: 'numeric' })}
          </ReleaseDate>
        </MovieMeta>
        <MovieVotes>
          <VoteCount>{this.props.votes} votes</VoteCount>
          <VoteButton onClick={() => this.props.voteHandler(this.props.episodeId)}>
            <img src={heart} className="App-vote" alt="heart" width="20" height="20"/>
          </VoteButton>
        </MovieVotes>
      </Movie>
    )
  }
}

export default MovieComponent;