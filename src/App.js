import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Login from './components/Login';
import Register from './components/Register';
import { Home } from './components/Home';

import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import customTheme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/home' component={Home} />
          </Switch>
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
