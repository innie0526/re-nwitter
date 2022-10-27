import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import HorizonLine from "./horizonLine";

// --------------------------------------------------

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  // Hook이란 리액트에 새로 도입된 기능. (useState, useEffect 가 대표적)
  // 1. useState - 함수 컴포넌트에서도 상태 관리를 할 수 있도록 함
  //    useState - 배열 비구조화 할당 사용 (객체 비구조화 할당과 비슷) 즉, 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법
  //    이 함수를 호출하면 배열이 반환된다. 배열의 첫 번째 원소는 현재 상태이며, 두 번째 원소는 상태를 바꾸어 주는 함수임.
  //    useState 함수는 하나의 상태 값만 관리 할 수 있기 때문에 컴포넌트에서 관리해야 할 상태가 여러개라면 여러번 사용해야함.
  // 2. useEffect - 렌더링 직후 작업을 설정해줌.

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //Log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <div className="authText">
        <span onClick={toggleAccount}>
          {newAccount ? "오늘 트위터에 가입하세요." : "트위터에 로그인하기"}{" "}
        </span>
      </div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className="authInput"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className="authInput"
          required
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Log in"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign in" : "계정이 없으신가요? Create Account"}
      </span>
      <HorizonLine text="또는" />
    </div>
  );
};

export default AuthForm;
