import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";

function ViewDecks() {
  /*
  const [decks, setDecks] = useState();
  const GET_DECKS_QUERY = gql`
    query getDecks {
      decks {
        id
        title
        lemmas
        flashcards
        src
        dst
        createdAt
        hasFlashcards
        isLearned
      }
    }
  `;
  const [getDecks] = useQuery(GET_DECKS_QUERY);
  useEffect(() => {
    getDecks().then((data) => {
      console.log(data, "decks");
    });
  });
  */

  return <div>This is the View Decks component</div>;
}

export default ViewDecks;
