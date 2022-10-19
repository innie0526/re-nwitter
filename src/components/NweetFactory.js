import React, { useState } from 'react';
import { dbService, storageService } from '../fBase';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState(''); //form을 위한 state
  const [attachment, setAttachment] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';

    // 이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment 가 있을 때만 아래 코드 실행
    // 이미지 첨부하지 않은 경우엔 attachmentUrl == '' 이 된다.
    if (attachment !== '') {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // storage참조 경로로 파일 업로드하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url',
      );

      // storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }

    // 트윗 오브젝트
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl, // 새로 트윗할 때 firebase storage에 이것도 같이 올라감
    };

    //트윗하기 누르면  nweetObj 형태로 새로운 document 생성하여 nweets collection 에 넣기
    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet(''); // form 비우기
    setAttachment(''); // 파일 미리보기 img src 비워주기
  };

  const onChange = ({ target: { value } }) => {
    // event 안에 있는 target 안에 있는 value를 달라고 하는 것임
    // console.log('Home->onChange->', value);
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

  return (
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
          <img src={attachment} alt="preview" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear upload</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;