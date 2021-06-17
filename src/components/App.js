import React from "react";
import "../styles/App.css";
import Home from "./Home";
import Header from "./Header";
import AddDeck from "./AddDeck";
import ViewDecks from "./ViewDecks";
import { Router } from "@reach/router";

function App() {
  return (
    <main className="app">
      <Header className="header-component" />
      <Router>
        <Home path="/" />
        <AddDeck path="add-deck" />
        <ViewDecks path="view-decks" />
      </Router>
      <footer>
        <span>Footer</span>
      </footer>
    </main>
  );
}

export default App;
