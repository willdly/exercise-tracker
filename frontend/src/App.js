import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <nav>
          <br />
          <Link to="/">Home</Link>
          <br />
          <br />
          <Link to="/add-exercise">New Exercise</Link>
        </nav>
        <div className="App-header">
          <Route path="/" exact>
            <header>
              <h1>"EXERCISE LOG"</h1>
              <p>Track and log your workouts</p>
            </header>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <header>
              <h1>"ADD EXERCISE"</h1>
              <p>Log an exercise below</p>
            </header>
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
          <header>
              <h1>"EDIT EXERCISE"</h1>
              <p>Edit selected exercise below</p>
            </header>
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
          </div>
      </Router>
      <footer>&#169; 2022 William Ly </footer>
    </div>
    
  );
}

export default App;