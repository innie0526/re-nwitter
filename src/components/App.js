import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
// import { authService } from '../fBase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setIsLoggedIn(true);  -> return에서 boolean으로 바꿔주면서 필요 없어짐 (아래 else 포함) -> 이렇게 하면 render을 하나 줄이게 됨.
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> // 수정 전 isLoggedIn={isLoggedIn}
      ) : (
        'Initializing...'
      )}
      <footer> &copy;{new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default App;
