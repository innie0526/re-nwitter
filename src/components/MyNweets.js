import { dbService } from "fBase";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "./Nweet";
// import NweetFactory from "./NweetFactory";

const MyNweets = ({userObj, nweetObj}) => {
  const [myNweets, setMyNweets] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyNweets(nweetArr);
      console.log(nweetArr); // console 에 내 트윗 배열상태로  보기
    });
  }, []);

  return (
    <div>
<label type="text" className="myNweetBtn">내 트윗들 보기</label>
{myNweets.map((nweet) => (
  <Nweet
    key={nweet.id}
    nweetObj={nweet}
    isOwner={nweet.creatorId === userObj.uid} // 수정삭제버튼 나옴
  />
))}
    </div>
  )
};


export default MyNweets;
