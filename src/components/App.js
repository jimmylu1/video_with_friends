// import React from 'react';
// import './App.css';

// function MainPage() {
//   return (
//     <div className="MainPage">
//     <p>HELLO WORLD</p>
//     </div>
//   );
// }

// export default MainPage;

import React, { useState } from "react";
// import { Button } from "../styled-components/Styled_components.jsx";
import StartForm from "./StartForm.js";
import Video from './Video.js'


const MainPage = () => {
  const [token, setToken] = useState(false);
  return (
    <div>
      <div>
        <h1>Share your screen :D</h1>
      </div>
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
    </div>
  );
};

export default MainPage;

/*
TO DO:

1. show local video
2. connect to room (remove)
3. show participant video on screen (remove)
4. handle events
*/

