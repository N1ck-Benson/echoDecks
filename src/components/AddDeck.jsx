import { Typography, Collapse, Button } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { useState } from "react";
import "../styles/AddDeck.css";

function AddDeck() {
  const [open, setOpen] = useState(false);

  const openHelper = () => {
    setOpen(!open);
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
            learning flashcards" has the lemmas "we", "is", "learn" and
            "flashcard"
          </Typography>
        </Collapse>
      </section>
    </main>
  );
}

export default AddDeck;
