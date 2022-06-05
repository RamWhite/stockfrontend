import React, { useEffect } from "react";
import AppBar from '../navbar/Appbar'

import { useLocalState } from "../../util/useLocalStorage";

function Home() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <>
      <AppBar/>
      <div>
        <h1>Hello World</h1>
        <div>JWT Value is {jwt}</div>
      </div>
    </>
  );
}
  
export default Home;