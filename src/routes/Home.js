import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../fBase';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';
import Nweet from '../components/Nweet';
import { v4 as uuid } from 'uuid';

// userObj : app.js -> router.js -> home.js
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(''); //form을 위한 state
  const [nweets, setNweets] = useState([]); //기본값이 비어있는 배열로 설정
  const [attachment, setAttachment] = useState();

  // useEffect 속 내용의 old ver. 새로 생성/변경 된 데이터는 새로고침해야 반영된다. -----------------
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, 'nweets'));
  //   dbNweets.forEach((document) => {
  //     // Nweet의 객체 = nweetObject
  //     const nweetObject = {
  //       ...document.data(), // ...은 data의 내용물
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]); // => is implicit return. 즉, 배열을 리턴함. document.data()(-> nweetObject로 바꿔줌) 는 가장 최근 data , ...prev 는 이전 document
  //     console.log(document.data()); // state(firebase)에 담긴 각각의 document.data() 내용을 콘솔에 출력
  //   });
  // };
  // --------------------------------------------------------------------------------------------

  // 생성/변경 시 realtime으로 변경 됨 ------------------------------------------------------------
  useEffect(() => {
    //component 가 amount되면 useEffect 사용
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc'),
    );
    // onSnapshot -> database에 무슨일이 생기면 바로 알림이 오는 realtime 기능
    onSnapshot(
      q,
      (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(snapshot.getDocs); //something happened 는 CRUD를 return 함
        // console.log(nweetArray);
        setNweets(nweetArr);
      },
      [],
    );
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    storageService.ref().child(`${userObj.uid}/}`);

    // await addDoc(collection(dbService, 'nweets'), {
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet('');
  };
  const onChange = ({ target: { value } }) => {
    // event 안에 있는 target 안에 있는 value를 달라고 하는 것임
    setNweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0]; // 한 개의 파일만 받음
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };
  // console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />

        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="150px" height="150px" />
            <button onClick={onClearAttachment}>Clear upload</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet // 자체 컴포넌트
            key={nweet.id}
            nweetObj={nweet} //nweetObj는 nweet의 모든 데이터
            isOwner={nweet.creatorId === userObj.uid} // userObj는 Home의 props에서 옴/ props는 router에 의해서 받음
          />
        ))}
      </div>
    </>
  );
};

export default Home;
