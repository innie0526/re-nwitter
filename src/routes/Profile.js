import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fBase";
import { dbService, storageService } from "fBase";
import { collection, query, where, orderBy,  onSnapshot, } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import Nweet from "components/Nweet";
import { getAuth, updateCurrentUSer } from "firebase/auth";



// prop으로 userObj를 받음
const Profile = ({ refreshUser, userObj, nweetObj  }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);
  const [mytweets, setMytweets] = useState([]);

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

//  ------------------내 nweet들만 보기
const auth = getAuth();
const user = auth.currentUser;
const uid = user.uid;

useEffect(() => {
  const q = query(
    collection(dbService, "nweets"),
    orderBy("createdAt", "desc"),
    where("creatorId", "==", userObj.uid)
  );
  onSnapshot(
    q,
    (snapshot) => {
      const nweetArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setMytweets(nweetArray);
      console.log(nweetArray); // 콘솔에 내 트윗 배열 상태로 보기
    },
    []
  ); // ------------------ 내 트윗 가져오기 끝 ---------------------------------
}, [userObj.uid]);


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
{/* --------------내트윗보기-------------------------------------------- */}
<label type="text" className="myNweetBtn">
        <span>내 트윗 보기</span>
      </label>
      <div>
        {mytweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid} // 수정삭제버튼 나옴
          />
        ))}
      </div>
      {/*  */}

      <span className="formBtm cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>

    </div>
  );
};

export default Profile;
