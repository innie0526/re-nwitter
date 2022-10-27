import React, { useEffect, useState } from "react";
import Nweet from "./Nweet";
import { dbService } from "fBase";
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const MyNweets = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("timestamp", "desc"),
      where("creatorId", "==", userObj.uid),
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  });
  //------------------ 내 트윗들만 보기------------------

  return (
    <div>
      {nweets.map((nweet) => (
        <Nweet // 자체 컴포넌트
          key={nweet.id}
          nweetObj={nweet} //nweetObj는 nweet의 모든 데이터
          isOwner={nweet.creatorId === userObj.uid} // 트윗을 누가 썼는지 알아내기 위함임. cloud.FB로 가면 coreatorID있음
        /> // nweet 만든 사람 === 글  작성한 사람. userObj는 Home의 props에서 옴/ props는 Router.js가 받음
      ))}
    </div>
  );
};
export default MyNweets;
