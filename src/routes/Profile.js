import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fBase";
import { updateProfile } from "firebase/auth";

// -----------------------프로필 화면-------------------------------------------
// prop으로 userObj를 받음
const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
    // 닉네임 변경
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // 닉네임이 기존이랑 다를 경우 전체 업데이트
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      setNewDisplayName("");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: 320,
        width: "50%",
        margin: "0 auto",
        marginTop: 80,
        // display: "flex",
        justifyContent: "center",
      }}
    >
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          autoFocus
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtm cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
