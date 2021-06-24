import {
  CircularProgress,
  Paper,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ChevronRight, Done, DoneAll, SwapHoriz } from "@material-ui/icons";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import { Link } from "@reach/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "../styles/LearnDeck.css";

const LearnDeck = (props) => {
  const idForReq = parseFloat(props.deckId);
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [cardsToLearn, setCardsToLearn] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const GET_DECK_QUERY = gql`
    query getDeck {
      deckById (id: ${idForReq}) {
        id
        title
        lemmas
        flashcards
        isLearned
      }
    }
  `;

  const { loading, data } = useQuery(GET_DECK_QUERY);

  useEffect(() => {
    if (!loading) {
      const updatedFlashcards = JSON.parse(data.deckById[0].flashcards).filter(
        (card) => card !== null
      );
      setIsLoading(false);
      setDeck(data.deckById[0]);
      setFlashcards(updatedFlashcards);
      setCardsToLearn(updatedFlashcards);
    }
  }, [loading, data]);

  const handleClick = (event) => {
    const { id } = event.target;

    if (id === "Show translation") {
      setIsFlipped(!isFlipped);
    }

    if (id === "Done") {
      const updatedCards = cardsToLearn.filter(
        (card) => card.src !== flashcards[0].src
      );
      setCardsToLearn(updatedCards);
    }

    if (id === "All done") {
      const updatedCards = cardsToLearn.filter(
        (card) => card.lemma !== flashcards[0].lemma
      );
      setCardsToLearn(updatedCards);
    }

    if (id === "Send to back") {
      const updatedCards = cardsToLearn;
      updatedCards.push(updatedCards.shift());
      setCardsToLearn(updatedCards);
    }
  };

  if (isLoading) return <CircularProgress color="primary" />;

  if (!cardsToLearn.length) {
    return (
      <main className="learn-deck-main">
        <section className="deck-complete">
          <CheckCircleTwoToneIcon fontSize="large" color="primary" /> &nbsp;
          <Typography variant="h4">Finished!</Typography>
          <Typography variant="h6" color="primary">
            <Link className="Link" to="/view-decks">
              Back to decks
            </Link>
          </Typography>
        </section>
      </main>
    );
  }

  return (
    <main className="learn-deck-main">
      <div className="learn-deck-heading">
        <Typography variant="h6">{deck.title}</Typography>
        <aside className="progress">
          <p>
            {`${flashcards.length - cardsToLearn.length} / ${
              flashcards.length
            }`}
            &nbsp;
          </p>

          <Done fontSize="small" color="primary" />
        </aside>
      </div>
      <section className="cards-list">
        <div className="card-stack">
          <Paper className="top-card" elevation={3}>
            <Typography variant="h6" className="card-heading">
              {cardsToLearn[0].lemma}
            </Typography>
            <Divider className="Divider" />
            <Typography variant="body1" className="card-text">
              {isFlipped ? cardsToLearn[0].dst : cardsToLearn[0].src}
            </Typography>
          </Paper>
          <Paper className="middle-card" elevation={5}></Paper>
          <Paper className="bottom-card" elevation={3}></Paper>
          <span className="card-pocket">
            <IconButton onClick={handleClick} className="IconButton">
              <Done color="primary" id="Done" />
            </IconButton>
            <IconButton onClick={handleClick} className="IconButton">
              <DoneAll color="primary" id="All done" />
            </IconButton>
            <IconButton onClick={handleClick} className="IconButton">
              <SwapHoriz color="primary" id="Show translation" />
            </IconButton>
            <IconButton onClick={handleClick} className="IconButton">
              <ChevronRight color="primary" id="Send to back" />
            </IconButton>
          </span>
        </div>
      </section>
    </main>
  );
};

export default LearnDeck;
