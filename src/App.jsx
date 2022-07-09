import logo from "./logo.svg";
import React, {useState, useEffect} from "react";
import "./App.css";

var parseNano = function(date) {
  var hours = Math.trunc(date/3600000000000);
  var res1 = date%3600000000000;
  var minutes = Math.trunc(res1/60000000000);
  var res2 = res1%60000000000;
  var sec = res2/1000000000;
  return `${hours} hours ${minutes} minutes and ${sec} seconds`
}

function App() {
  var a= ()=> {
    fetch("http://localhost:8080/")
    .then(res => res.text())
    .then(res => {setState(
        parseNano(res.split(" ")[1])
      ); setPath(res.split(" ")[0])} 
    )
  };
  useEffect(() => {
    a();
    const interval = setInterval(() => {
      a();
    }, 600000);
    return () => clearInterval(interval);
  }, [])
  const [state, setState] = useState(" ");
  const [path, setPath] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <h2>Welcome to Clockn!</h2>
        <h4>You've passed {state} in {path}</h4>
      </header>
    </div>
  );
}

export default App;
