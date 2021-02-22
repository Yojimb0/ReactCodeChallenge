import styled from 'styled-components';

const Total = styled.dl`
  border-radius:8px;
  display:grid;
  grid: auto-flow / 2fr 1fr;
  overflow:hidden;
  margin:0 0 30px;
  font-weight: bold;
  font-size: 1.3rem;
  
  & > dt {
    background:rgba(0,0,0,.1);
    padding:5px 10px;
    margin:0;
  }
  & > dd {
    background:rgba(0,0,0,.1);
    padding:5px 10px;
    margin:0;
    text-align:center;
  }
`

export default Total;