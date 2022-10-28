import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { authService, dbService, storageService } from "fBase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NweetFactory = ({ userObj }) => {
  // --------------------- nweets 생성 -------------------------
  const [nweet, setNweet] = useState(""); //form을 위한 state
  const [attachment, setAttachment] = useState(""); //트윗할 때 텍스트만 입력 시 이미지 url을 ""로 비워두기

  const onSubmit = async (e) => {
    if (nweet === "") {
      return;
    }
    e.preventDefault();
    let attachmentUrl = ""; // 사진이 없다면 첨부파일주소는 빈 값. 사진 첨부하면 storage에서 다운받은 URL로 업데이트

    // 이미지 첨부하지 않은 경우엔 attachmentUrl == '' 이 된다.
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // storage참조 경로로 파일 업로드하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url", // data_url은 readAsDataURL에서 한거임
      );

      // storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }

    const todayTime = () => {
      let now = new Date(); // 현재 날짜 및 시간
      let todayYear = now.getFullYear();
      const todayMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let monthOfYear = todayMonth[now.getMonth() + 1];
      let todayDate = now.getDate();
      const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let dayOfWeek = week[now.getDay()];
      let hours = now.getHours();
      let minutes = String(now.getMinutes()).padStart(2, "0");
      let seconds = String(now.getSeconds()).padStart(2, "0");

      return (
        monthOfYear +
        "  " +
        todayDate +
        ", " +
        todayYear +
        "  " +
        dayOfWeek +
        "  " +
        hours +
        " : " +
        minutes +
        " : " +
        seconds
      );
    };
    console.log(todayTime());
    // 트윗 오브젝트
    const nweetObj = {
      text: nweet, //우리의 document의 key
      timestamp: todayTime(),
      creatorId: userObj.uid,
      author: authService.currentUser.displayName,
      attachmentUrl, // 새로 트윗할 때 firebase storage에 이것도 같이 올라감
    };

    //트윗하기 누르면  nweetObj 형태로 새로운 document 생성하여 nweets collection 에 넣기
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet(""); // form 비우기
    setAttachment(""); // 파일 미리보기 img src 비워주기
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

  // ---------------내 트윗만 보기----------------
  const navigate = useNavigate();

  const onMyNweetsClick = () => {
    navigate("/myNweets");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
        {attachment && (
          <span className="factoryForm factoryForm__attachment">
            <img
              src={attachment}
              alt="preview"
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </span>
        )}
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      <input className="NweetBtn" type="submit" value="Nweet" />

      <div>
        <span path="/Mynweets" onClick={onMyNweetsClick} className="NweetBtn">
          My Nweets
        </span>
      </div>
    </form>
  );
};

export default NweetFactory;
