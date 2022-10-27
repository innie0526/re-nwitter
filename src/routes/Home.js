import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

// userObj : app.js -> router.js -> home.js
const Home = ({ userObj }) => {
  // --------------트윗들(nweets) 가져오기
  const [nweets, setNweets] = useState([]); //기본값이 비어있는 배열로 설정

  // 생성/변경 시 realtime으로 변경 됨 ------------------------------------------------------------
  useEffect(() => {
    // cloud firestore로 실시간 업데이트를 가져오는 함수. 컴포넌트가 amount되면 useEffect 사용
    // 쿼리문을 변수로 담았고 파이어스토어에 컬렉션에라는 곳에서 "nweets"라는 테이블을
    // select * from nweets 처럼 테이블 안에 있는 내용을 작성일자가 최근을 위로 올려달라고 요청
    const q = query(
      collection(dbService, "nweets"),
      orderBy("timestamp", "desc"),
    );

    // 실시간으로 반영하기위해 스냅샷 기능을 사용
    onSnapshot(q, (snapshot) => {
      // 해당 쿼리로 요청해서 받은 값들을 map으로 원하는 목록만 재배열하여 변수에 담음
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id, // 데이터 베이스 아이디라고 생각하면 됨
        ...doc.data(), // 컬렉션 테이블 정보 및 값들 이라고 생각하면 됨
      }));
      setNweets(nweetArr); // 배열 변수에 정보 넣기
    }); //------------트윗들(nweets) 가져오기 끝 ----------------------
  }, []);

  return (
    <>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet // 자체 컴포넌트
            key={nweet.id}
            nweetObj={nweet} //nweetObj는 nweet의 모든 데이터
            isOwner={nweet.creatorId === userObj.uid} // 트윗을 누가 썼는지 알아내기 위함임. cloud.FB로 가면 coreatorID있음
          /> // nweet 만든 사람 === 글  작성한 사람. userObj는 Home의 props에서 옴/ props는 Router.js가 받음
        ))}
      </div>
    </>
  );
};

export default Home;
