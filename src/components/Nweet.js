import React, { useState } from 'react';
import { dbService } from '../fBase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // nweet 수정 모드
  const [newNweet, setNewNweet] = useState(nweetObj.text); // input에 있는 값(newNweet)을 수정

  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDeleteClick = async () => {
    // async, await -> 삭제함수가 비동기 함수이기 때문에 동기적으로 실행시켜 빠르게 처리하기 위해서
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    // console.log(ok);
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(nweetObj, newNweet); //update Nweet 클릭 시 콘솔창에 출력
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      terget: { value },
    } = e; // 적었는데도 왜 안지워질까용..?
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
