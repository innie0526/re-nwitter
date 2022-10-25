import React from "react";
import { authService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />

      <div>
        <AuthForm />
        <button name="google" onClick={onSocialClick} className="authBtn">
          Google 계정으로 로그인하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Github 계정으로 로그인하기 <FontAwesomeIcon icon={faGithub} />
        </button>
        {/* react에서 onClick 이벤트 
           클릭 이벤트는 하나의 엘리먼트가 클릭이 되어있을 때 발동되며 onClick으로 정의됨
            이는 유저의 액션에 대해 작용하고 싶은 엘리먼트의 attribute로 정의됨*/}
      </div>
    </div>
  );
};

export default Auth;
