import {
  Typography,
  Collapse,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { Link } from "@reach/router";
import { useEffect } from "react";
import { useState } from "react";
import Options from "./Options";
import "../styles/AddDeck.css";

const AddDeck = () => {
  const buildLemmaList = () => {
    return [
      {
        lemma: "",
        isLastLemma: false,
        isValid: false,
        isChecking: false,
        isChecked: false,
      },
      {
        lemma: "",
        isLastLemma: true,
        isValid: false,
        isChecking: false,
        isChecked: false,
      },
    ];
  };

  const [helperOpen, setHelperOpen] = useState(false);
  const [lemmas, setLemmas] = useState(buildLemmaList());
  const [lemmasReady, setLemmasReady] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [languages, setLanguages] = useState(null);
  const [lingueeData, setLingueeData] = useState([]);
  const [deckName, setDeckName] = useState("New Deck");

  const handleChange = ({ target }) => {
    const { value } = target;
    const id = parseInt(target.id);
    const updatedLemmas = lemmas;
    updatedLemmas[id].lemma = value;
    if (updatedLemmas[id].isLastLemma) {
      updatedLemmas[id].isLastLemma = false;
      const blankLemma = {
        lemma: "",
        isLastLemma: true,
        isValid: false,
        isChecking: false,
        isChecked: false,
      };
      updatedLemmas.push(blankLemma);
    }
    console.log(updatedLemmas, "<<< updatedLemmas");
    setLemmas(updatedLemmas);
  };

  const checkLemmas = () => {
    // hits the linguee API with an api function
    // for each item in lemmas, using the lemma value.
    // each time, sets checking to true ->
    // this triggers a spinner in the input
    // on response, sets checking to false,
    // checked to true, and valid to true or false,
    // depending on response.
    // valid status sets a tick or edit/delete buttons
  };

  useEffect(() => {
    if (
      lemmas.every((lemma) => {
        return lemma.isValid;
      })
    ) {
      setLemmasReady(true);
    } else {
      setLemmasReady(false);
    }
  }, [lemmas]);

  const buildDeck = () => {};

  if (optionsOpen) {
    return (
      <main>
        <section className="lemmas-section">
          <Options
            deckName={deckName}
            setDeckName={setDeckName}
            setLanguages={setLanguages}
            setOptionsOpen={setOptionsOpen}
          />
        </section>
      </main>
    );
  }

  return (
    <main>
      <Typography variant="h6" className="add-decks-heading">
        Add your lemmas...
      </Typography>
      <section className="helper-section">
        <Button
          onClick={() => {
            setHelperOpen(!helperOpen);
          }}
          className="helper-button"
        >
          <Typography className="helper-heading">
            <EmojiObjectsOutlinedIcon />
            &nbsp; what's a lemma?
          </Typography>
        </Button>
        <Collapse in={helperOpen} timeout="auto" unmountOnExit>
          <Typography variant="body2" className="helper-text">
            Lemmas are how words are listed in a dictionary. <br /> "We are
            learning flashcards" has the lemmas "we", "be", "learn" and
            "flashcard".
          </Typography>
        </Collapse>
      </section>
      <section className="lemmas-section">
        <Paper elevation={2} className="lemma-inputs">
          {lemmas.map((lemma, index) => {
            return (
              <div className="lemma-input" key={index}>
                <TextField
                  id={index.toString()}
                  label={`Lemma #${index + 1}`}
                  variant="outlined"
                  color="secondary"
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </Paper>
        {!lemmasReady ? (
          <div className="button-group">
            <Button size="small" variant="outlined" color="secondary">
              <Link to="/" className="Link">
                Cancel
              </Link>
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className="Button"
              onClick={checkLemmas}
            >
              Check
            </Button>
          </div>
        ) : (
          <div className="button-group">
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={buildDeck}
            >
              Go!
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default AddDeck;
