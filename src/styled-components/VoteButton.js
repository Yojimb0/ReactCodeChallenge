import styled from 'styled-components';

const VoteButton = styled.button`
  font-family: sans-serif;
  font-size:1.3rem;
  background:none;
  border:none;
  padding:0;
  cursor:pointer;
  
  & > img {
    display:block;
    border-radius:20px;
    background:LightPink;
    padding:5px;
    fill:red;
    transition: all .1s;
  }
  
  &:hover img,
  &:focus img{
    background:HotPink;
    transform: scale(1.2) rotate(10deg);
  }
  
  &:active img{
    background:HotPink;
    transform: scale(.8) rotate(10deg);
  }
`

export default VoteButton;