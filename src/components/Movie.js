import React from 'react';
import Movie from '../styled-components/Movie';
import MovieMeta from '../styled-components/MovieMeta';
import Title from '../styled-components/Title';
import ReleaseDate from '../styled-components/ReleaseDate';
import MovieVotes from '../styled-components/MovieVotes';
import VoteButton from '../styled-components/VoteButton';
import VoteCount from '../styled-components/VoteCount';
import heart from '../icons/heart.svg';


export const MovieComponent = (props) => {
  
  return(
    <Movie role="listitem">
      <MovieMeta>
        <Title data-testid={'title#'+props.testId}>{props.title}</Title>
        <ReleaseDate datetime={props.releaseDate}>
          {new Date(props.releaseDate).toLocaleDateString(undefined, { month: 'long',day: '2-digit', year: 'numeric' })}
        </ReleaseDate>
      </MovieMeta>
      <MovieVotes>
        <VoteCount data-testid={'votes#'+props.testId}>{props.votes} votes</VoteCount>
        <VoteButton data-testid={'button#'+props.testId} onClick={() => props.voteHandler(props.episodeId)}>
          <img src={heart} className="App-vote" alt="heart" width="20" height="20"/>
        </VoteButton>
      </MovieVotes>
    </Movie>
  )
}