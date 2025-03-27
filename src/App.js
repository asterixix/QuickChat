import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CallProvider } from './contexts/CallContext';
import Home from './pages/Home';
import Login from './pages/Login';
import CallRoom from './pages/CallRoom';
import Calendar from './pages/Calendar';

function App() {
  return (
    <AuthProvider>
      <CallProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/call/:id" component={CallRoom} />
            <Route path="/calendar" component={Calendar} />
            <Route render={() => <h1>404: Page Not Found</h1>} />
          </Switch>
        </Router>
      </CallProvider>
    </AuthProvider>
  );
}

export default App;