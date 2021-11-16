// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { useContext } from "react";
import ServiceContext from "./common/ServiceContext";

function App() {
  const [entries, setEntries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const context = useContext(ServiceContext);

  const transferToEntries = (data) => {
    let nouveauTableau = data.map((x) => Object.values(x).join(" - "));
    setEntries(nouveauTableau);
  };

  const handleList = () => {
    context.apiService.getDataFromList((data) => {
      transferToEntries(data);
      // setEntries(data);
    });
    // console.log(entries);
  };
  const handleSearch = () => {
    context.apiService.getDataFromSearch(searchText, (data) => {
      transferToEntries(data);
      //  alert(searchText);
    });
  };

  return (
    <div className="App">
      <h1>Annuaire</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>rechercher</button>
      <button onClick={handleList}>tout</button>
      <div>
        {entries.map((x) => (
          <div>{x}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
