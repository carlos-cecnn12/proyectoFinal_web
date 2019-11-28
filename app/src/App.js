import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a href="" className="text-white">
            Juega Ocho Loco
        </a>
      </nav>
      <div>
        <text href="">
            Room
        </text>
        <input type="text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
      </div>
      <div>
        <text href="">
            Player
        </text>
        <input type="text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
      </div>
      <button type="button" class="btn btn-primary btn-lg">Go!</button>
      
    </div>


  );
}

export default App;
