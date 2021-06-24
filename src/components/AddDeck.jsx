import {
  Typography,
  Collapse,
  Button,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { CheckCircle, HighlightOff } from "@material-ui/icons";
import { Link, useNavigate } from "@reach/router";
import { useEffect } from "react";
import { useState } from "react";
import Options from "./Options";
import getExamples from "../linguee-api";
import "../styles/AddDeck.css";
import { gql, useMutation } from "@apollo/client";

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
  const lemmasToPost = lemmas.map((lemma) => {
    return lemma.lemma;
  });

  // Reorder the examples as follows:
  // lemma.1a, lemma.2a, lemma.3a,
  // lemma.1b, lemma.2b, lemma.3b, etc.
  // Then stringify for posting to database.
  const examplesToPost = () => {
    const reorderedExamples = [];
    lemmas.forEach((lemma, index) => {
      examples.forEach((exampleArray) => {
        reorderedExamples.push(exampleArray[index]);
      });
    });
    return JSON.stringify(reorderedExamples);
  };

  const navigate = useNavigate();
  const POST_DECK_MUTATION = gql`
    mutation PostDeck(
      $title: String!
      $lemmas: [String!]!
      $flashcards: String!
      $src: String!
      $dst: String!
    ) {
      post(
        title: $title
        lemmas: $lemmas
        flashcards: $flashcards
        src: $src
        dst: $dst
      ) {
        id
      }
    }
  `;

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
    if (examples.length) {
      console.log("Examples were cleared before re-checking");
      setExamples([]);
    }
    lemmas.forEach((lemma, index) => {
      if (!lemma.isLastLemma) {
        console.log(`checking ${lemma.lemma}`);
        const updatedLemmas = lemmas;
        updatedLemmas[index].isChecking = true;
        setLemmas(updatedLemmas);
        const searchTerm = lemma.lemma;
        getExamples(searchTerm, languages).then((res) => {
          const updatedExamples = examples;
          updatedExamples.push(res);
          setExamples(updatedExamples);
          const updatedLemmas = lemmas;
          updatedLemmas[index].isChecking = false;
          updatedLemmas[index].isChecked = true;
          updatedLemmas[index].isValid = true;
          console.log(`finished checking ${lemma.lemma}`);
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
  });

  const [postDeck] = useMutation(POST_DECK_MUTATION, {
    variables: {
      title: deckName,
      lemmas: lemmasToPost,
      flashcards: examplesToPost(),
      src: languages.src,
      dst: languages.dst,
    },
  });

  const buildAndPost = () => {
    postDeck().then(() => {
      navigate("/view-decks");
    });
  };

  if (optionsOpen) {
    return (
      <main className="add-deck-main">
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
    <main className="add-deck-main">
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
            let inputAdornments = "";
            if (lemma.isChecking) {
              inputAdornments = <CircularProgress color="primary" />;
            }
            if (lemma.isChecked && lemma.isValid) {
              inputAdornments = <CheckCircle color="primary" />;
            }
            if (lemma.isChecked && !lemma.isValid) {
              inputAdornments = <HighlightOff color="secondary" />;
            }

            return (
              <div className="lemma-input" key={index}>
                <TextField
                  id={index.toString()}
                  label={`Lemma #${index + 1}`}
                  variant="outlined"
                  color="secondary"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {inputAdornments}
                      </InputAdornment>
                    ),
                  }}
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
              onClick={buildAndPost}
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
