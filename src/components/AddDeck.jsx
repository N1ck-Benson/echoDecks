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
import getExamples from "../linguee-api";
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

  const [lemmas, setLemmas] = useState(buildLemmaList());
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [deckName, setDeckName] = useState("New Deck");
  const [languages, setLanguages] = useState({ src: "es", dst: "en" });
  const [helperOpen, setHelperOpen] = useState(false);
  const [examples, setExamples] = useState([]);
  const [lemmasReady, setLemmasReady] = useState(false);

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
    setLemmas(updatedLemmas);
  };

  const checkLemmas = () => {
    console.log(
      "lemmas: ",
      lemmas,
      "languages: ",
      languages,
      "deckName: ",
      deckName
    );
    lemmas.forEach((lemma, index) => {
      if (!lemma.isLastLemma) {
        const updatedLemmas = lemmas;
        updatedLemmas[index].isChecking = true;
        setLemmas(updatedLemmas);
        const searchTerm = lemma.lemma;
        getExamples(searchTerm, languages).then((res) => {
          const updatedExamples = examples.push({
            lemma: searchTerm,
            content: res,
          });
          setExamples(updatedExamples);
          const updatedLemmas = lemmas;
          updatedLemmas[index].isChecking = false;
          updatedLemmas[index].isChecked = true;
          updatedLemmas[index].isValid = typeof res === "string" ? false : true;
          setLemmas(updatedLemmas);
        });
      }
    });
  };

  useEffect(() => {
    if (
      lemmas.every((lemma) => {
        return lemma.isValid || lemma.isLastLemma;
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
        Add your vocab...
      </Typography>
      <section className="helper-section">
        <Button
          onClick={() => {
            setHelperOpen(!helperOpen);
          }}
          className="helper-button"
        >
          <p className="helper-heading">
            <EmojiObjectsOutlinedIcon />
            &nbsp; Lemmas are recommended
          </p>
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
