import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fBase";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); // userObj의 시작점 -> Router.js로 이동

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setIsLoggedIn(true);  -> return에서 boolean으로 바꿔주면서 필요 없어짐 (아래 else 포함) -> 이렇게 하면 render을 하나 줄이게 됨.
        // setUserObj(user);   -> user의 정보 자체가 커서 react가 어떤 정보를 추출해서 profile을 update해야하는지 결정을 못함. 따라서 아래처럼 몇몇 정보만 지정 해줘야한다.
        setUserObj({
          displayName: authService.currentUser.displayName
            ? authService.currentUser.displayName
            : "이름을 설정해주세요.", // 이름값이 null일 때 이름을 'Anonymous'로 설정
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // user를 새로고침하는 기능 / Auth 패키지 함수 중 updateCurrentUser라는 함수 사용
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer className="footer">
        <div>&copy;{new Date().getFullYear()} Nwitter</div>
      </footer>
    </>
  );
};

export default App;
