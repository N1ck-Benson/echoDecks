import { Paper, MenuItem, Menu } from "@material-ui/core";
import { CheckCircleOutline, MoreHoriz } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "@reach/router";
import "../styles/ViewDecks.css";

// Note: src and dst are included on props for future inclusion,
// either as flag icons or just a verbal caption.
const DeckListing = (props) => {
  const { id, title, createdAt, src, dst, isLearned } = props;
  const date = new Date(parseInt(createdAt)).toLocaleDateString();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  // Note: schema is written for this, just need to write a useMutation() here.
  const deleteDeck = () => {
    console.log("User clicked 'delete deck'");
  };

  return (
    <div className="view-card-stack">
      <Paper className="view-top-card" elevation={3}>
        <p className="deck-title">
          {title}&nbsp;
          <CheckCircleOutline
            color={isLearned ? "primary" : "disabled"}
            fontSize="small"
          />
        </p>
        <button type="button" onClick={handleClick} className="button-wrapper">
          <MoreHoriz />
        </button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link className="Link" to={`/learn-deck/${id}`}>
              Learn Deck
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <button
              type="button"
              className="button-wrapper"
              onClick={deleteDeck}
            >
              Delete Deck
            </button>
          </MenuItem>
        </Menu>
        <p className="deck-date">{date}</p>
      </Paper>
      <Paper className="view-middle-card" elevation={5}></Paper>
      <Paper className="view-bottom-card" elevation={3}></Paper>
      <span className="view-card-pocket"></span>
    </div>
  );
};

export default DeckListing;
