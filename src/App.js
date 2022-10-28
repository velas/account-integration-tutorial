import logo from './logo.svg';
import './App.css';
import {vaclient} from "./vaclient";
import {useEffect, useState} from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  function processAuthResult (e, authResult) {
    window.history.replaceState({}, document.title, window.location.pathname);
    if (authResult && authResult.access_token_payload) {
      setSessionData(authResult);
      vaclient.userinfo(authResult.access_token, (e, result) => {
        if (e) {
          setSessionData(null);
          if (e.error === 'failed_authorization') {
            throw new Error(`Session terminated: ${e.description || e}`);
          } else {
            throw new Error(`Userinfo error: ${e.description || e}`);
          }
        } else {
          setUserInfo(result.userinfo);
        }
      });
    } else if (e) {
      throw new Error(e);
    }
  }

  useEffect(()=>{
    vaclient.handleRedirectCallback(processAuthResult);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={()=>{
          vaclient.authorize({
            csrfToken: async function () {
              const response = await fetch("http://localhost:3002/csrf/", {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const {token} = await response.json();
              return token
            },
            scope: 'VelasAccountProgram:Transfer VelasAccountProgram:Execute'
          }, processAuthResult);
        }}>Sign In With Velas Account</button>
        {sessionData && userInfo ? <p>{sessionData.access_token_payload.sub}</p> : ""}
      </header>
    </div>
  );
}

export default App;
