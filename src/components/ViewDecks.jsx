import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import DeckListing from "./DeckListing";
import { Link } from "@reach/router";
import "../styles/ViewDecks.css";

function ViewDecks() {
  const [isLoading, setIsLoading] = useState(true);
  const [decks, setDecks] = useState(null);

  // GraphQL schema.
  const GET_DECKS_QUERY = gql`
    query getDecks {
      decks {
        id
        title
        flashcards
        src
        dst
        createdAt
        isLearned
      }
    }
  `;

  const { loading, data } = useQuery(GET_DECKS_QUERY);

  // Should only load decks once, but dependency array allows for updates.
  useEffect(() => {
    if (!loading) {
      const updatedDecks = data.decks.map((deck) => {
        const deckCopy = { ...deck };
        deckCopy.flashcards = JSON.parse(deckCopy.flashcards);
        return deckCopy;
      });
      setIsLoading(false);
      setDecks(updatedDecks);
    }
  }, [loading, data]);

  if (isLoading) return <CircularProgress color="primary" />;

  return (
    <main className="view-decks-main">
      <Typography variant="h6" className="view-decks-heading">
        My Decks
      </Typography>
      {decks ? (
        <section className="view-decks-list">
          {decks.map((deck, index) => {
            return (
              <DeckListing
                id={deck.id}
                title={deck.title}
                createdAt={deck.createdAt}
                src={deck.src}
                dst={deck.dst}
                isLearned={deck.isLearned}
                key={index}
              />
            );
          })}
        </section>
      ) : (
        <section className="no-decks-list">
          <Typography variant="body2" color="primary">
            No decks to show
          </Typography>
          <Button variant="contained" color="primary">
            <Link to="/add-deck" className="Link">
              Add deck
            </Link>
          </Button>
        </section>
      )}
    </main>
  );
}

export default ViewDecks;
