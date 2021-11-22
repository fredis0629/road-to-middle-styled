import logo from './logo.svg';
import './App.css';

import styled from './styled';

const Button = styled.button`
  margin: 1rem;
  background-color: white;
  color: ${(props) => props.color};
`;

const Button2 = styled(Button)`
  background-color: ${props => props.bg || 'red'};
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button2 color="red" bg="black" onClick={()=>alert('click')} title="JJJ" >Hi</Button2>
        <Button color="red" onClick={()=>alert('click')} title="JJJ" >Hi</Button>
        <Button color="#000">baton</Button>
      </header>
    </div>
  );
}

export default App;
