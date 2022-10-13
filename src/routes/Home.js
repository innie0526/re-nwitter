import React, { useEffect, useState } from 'react';
import { dbService } from '../fBase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, 'nweets'));
    console.log(dbNweets);
  };

  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    //collection("collection"). field /value })
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
      createAt: Date.now(),
    });
    setNweet('');
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

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
        <input type="submit" value="Ntweet" />
      </form>
    </>
  );
};

export default Home;
