/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { dbService, storageService } from "../fBase"; // firestore(게시글) 와 storageService(image)
import { doc, deleteDoc, updateDoc } from "firebase/firestore"; //firestore에 nweet내용(게시글) 수정 및 삭제
import { deleteObject, ref } from "@firebase/storage"; // image의 url을 저장하고 삭제하는 용도
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// --------------------------------------------------------------------------------------------------

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // nweet 수정 모드
  const [newNweet, setNewNweet] = useState(nweetObj.text); // input에 있는 값(newNweet)을 수정
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const desertRef = ref(storageService, nweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    // async, await -> 삭제함수가 비동기 함수이기 때문에 동기적으로 실행시켜 빠르게 처리하기 위해서
    const ok = window.confirm("이 nweet을 정말로 지우겠습니까?");
    if (ok) {
      //해당하는 트윗 파이어스토어에서 삭제
      await deleteDoc(NweetTextRef);
      //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(desertRef);
      }
    }
  };

  // 수정 / 비수정 상태를 토글로 만듦
  // prev, current 로 props를 받는 이유는 현재 상태값을 정확하게 받을 수 있기 때문에 안전해서 ㅇㅇ
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(nweetObj, newNweet); //update Nweet 클릭 시 콘솔창에 출력
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div
      className="nweet"
      style={{
        maxWidth: 890,
        width: "100%",
        margin: "0 auto",
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {editing ? (
        <div>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </div>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
