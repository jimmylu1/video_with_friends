import React, { useState } from "react";
import axios from "axios";
// import regeneratorRuntime from "regenerator-runtime";

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    
    //add new user based on what was added in form
    //get data for new user
    const res = await axios({
      method: "POST",
      url: "https://pistachio-markhor-9452.twil.io/generate-token",
      data: {
        identity: name
      }
    });
    const jwt = res.data;
    storeToken(jwt);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Display Name: <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="room">
        Room to Join: <br />
        <input
          type="text"
          id="room"
          name="room"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Join Video Chat</button>
    </form>
  );
};

export default StartForm;
