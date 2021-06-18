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
      <section className="page-content">
        <Router>
          <Home path="/" />
          <AddDeck path="add-deck" />
          <ViewDecks path="view-decks" />
        </Router>
      </section>
      <footer>&nbsp; © Nick Benson 2020</footer>
    </main>
  );
}

export default App;
