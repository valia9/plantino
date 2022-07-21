
import './App.css';
import Menu from './components/Menu';

function App() {
  return (
    <div className="container">
      <h1>PLANTINO</h1>
      <button className='app--button'>Sign Up</button>
      <button className='app--button'>Sign In</button>
      <Menu />
    </div>
  );
}

export default App;
