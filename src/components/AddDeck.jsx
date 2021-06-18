import {
  Typography,
  Collapse,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { useState } from "react";
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

  const [open, setOpen] = useState(false);
  const [lemmas, setLemmas] = useState(buildLemmaList());
  const [lingueeData, setLingueeData] = useState([]);

  console.log(lemmas);

  const openHelper = () => {
    setOpen(!open);
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
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

  return (
    <main>
      <Typography variant="h6" className="add-decks-heading">
        Add your lemmas...
      </Typography>
      <section className="helper-section">
        <Button onClick={openHelper} className="helper-button">
          <Typography className="helper-heading">
            <EmojiObjectsOutlinedIcon />
            &nbsp; what's a lemma?
          </Typography>
        </Button>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography variant="body2" className="helper-text">
            Lemmas are how words are listed in a dictionary. <br /> "We are
            learning flashcards" has the lemmas "we", "be", "learn" and
            "flashcard".
          </Typography>
        </Collapse>
      </section>
      <section className="lemmas-section">
        <Paper className="lemma-inputs">
          {lemmas.map((lemma, index) => {
            return (
              <div className="lemma-input" key={index}>
                <TextField
                  id={index}
                  label={`Lemma #${index + 1}`}
                  variant="outlined"
                  color="secondary"
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </Paper>
      </section>
    </main>
  );
};

export default AddDeck;
