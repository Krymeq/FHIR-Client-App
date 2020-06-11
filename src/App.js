import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import PatientList from './pages/PatientList/PatientList';
import PatientData from './pages/PatientData/PatientData';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/patients">
            <PatientList/>
          </Route>
          <Route path="/patient/:id">
            <PatientData/>
          </Route>
          <Route path="/">
            <Redirect to="/patients"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
