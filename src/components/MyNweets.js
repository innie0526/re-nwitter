import { dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "./Nweet";

const MyNweets = ({ userObj }) => {
  const [myNweets, setMyNweets] = useState([]);

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
      <span>내가 쓴 Nweet 보기</span>
      {myNweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid} // 수정삭제버튼 나옴
        />
      ))}
    </div>
  );
};

export default MyNweets;
