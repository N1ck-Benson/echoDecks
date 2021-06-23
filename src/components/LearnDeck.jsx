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
  const dummyDeck = {
    id: 9,
    title: "New deck",
    lemmas: ["como", "hablar", ""],
    flashcards: JSON.parse(
      '[{"lemma":"tolerar","src":"Deseo reiterar aquí nuestra convicción de que no se puede [...] y no se debe tolerar el terrorismo [...] en modo alguno.","dst":"I wish here to reiterate our conviction that [...] there can and must be no tolerance for [...] terrorism.","isLearned":false},{"lemma":"sostener","src":"Se debe sostener que la vía diplomática [...] y las organizaciones regionales, son los canales legítimos para la discusión y análisis [...] de las agendas bilaterales y multilaterales entre nuestros países.","dst":"It should be stressed that diplomatic [...] means and regional organizations are the legitimate channels for discussion and analysis [...] of bilateral and multilateral agendas between our countries.","isLearned":false},{"lemma":"tolerar","src":"No hay nada que pueda tolerar o excusar la violación [...] de estos derechos.","dst":"Violation of these [...] rights cannot be tolerated or excused on any ground.","isLearned":false},{"lemma":"sostener","src":"En esta etapa, es importante sostener siempre de la mano [...] a un niño pequeño o en edad preescolar cuando hay autos cerca, [...] aunque esté en un camino de entrada.","dst":"At this age it is [...] more important to always hold a toddler [...] or preschooler\'s hand when they are near cars, even when you are only in a driveway.","isLearned":false},{"lemma":"tolerar","src":"Hubiera podido tolerar una cierta cantidad de palabrería hueca y de reiteración.","dst":"I would have been able to live with a certain amount of hot air and repetition.","isLearned":false},{"lemma":"sostener","src":"Los pagos a funcionarios públicos para fomentar y sostener un acceso monopolístico u oligopolístico a un mercado sin que haya una explicación económica suficiente para que [...] [...] se establezcan tales restricciones.","dst":"Illegal fees paid by parents to teachers or head teachers to get their children admitted to schools, to be promoted or to pass their exams are examples of petty corruption.","isLearned":false}]'
    ),
    isLearned: false,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [deck, setDeck] = useState(dummyDeck);
  const [flashcards, setFlashcards] = useState(dummyDeck.flashcards);
  const [cardsToLearn, setCardsToLearn] = useState(flashcards);
  const [isFlipped, setIsFlipped] = useState(false);
  const GET_DECK_QUERY = gql`
    query getDeck {
      deck (id: ${props.id}) {
        id
        title
        lemmas
        flashcards
        isLearned
      }
    }
  `;
  // const { loading, data } = useQuery(GET_DECK_QUERY);
  // !! remember to JSON.parse the flashcards key before doing setDecks
  // useEffect(() => {
  //   setIsLoading(loading);
  //   setDecks(data);
  // }, [loading, data]);

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
              {cardsToLearn[0].src}
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
