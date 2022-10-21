import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fBase";
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// prop으로 userObj를 받음
const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  // 내 nweets 얻는 function 생성
  // const getMyNweets = async () => {
  //   // 어떤 user 가 이 화면을 보고 있는 지 알 수 있게 됨 = 어떤 user의 Nweets를 불러와야 하는지 알게 됨
  //   const q = query(
  //     collection(dbService, "nweets"),
  //     where("creatorId", "==", userObj.uid), //where() 은 어떻게 filtering 하는지 알려줌
  //     orderBy("createdAt", "desc"),
  //   );

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  // };

  // 내 nweets 얻는 function 호출
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          autoFocus
          onChange={onChange}
          placeholder="Display name"
          value={newDisplayName}
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
