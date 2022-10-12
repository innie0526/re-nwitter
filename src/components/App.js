import React, {useState} from 'react';
import AppRouter from './Router';
import {authService} from '../fBase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(isLoggedIn); 


  return (
    <>
  <AppRouter isLoggedIn={isLoggedIn} />
  <footer> &copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
