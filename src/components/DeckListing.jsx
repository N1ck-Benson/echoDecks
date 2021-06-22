import { Paper, MenuItem, Menu, Link } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { useState } from "react";

const DeckListing = (props) => {
  const { title, createdAt, src, dst, isLearned } = props;
  const date = new Date(parseInt(createdAt)).toLocaleDateString();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const deleteDeck = () => {
    console.log("User clicked 'delete deck'");
  };
  return (
    <div className="card-stack">
      <Paper className="top-card" elevation={3}>
        <p className="deck-title">{title}</p>
        <button onClick={handleClick} className="button-wrapper">
          <MoreHoriz />
        </button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link className="Link" to="learn-deck">
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
      <Paper className="middle-card" elevation={3}></Paper>
      <Paper className="bottom-card" elevation={3}></Paper>
      <span className="card-pocket"></span>
    </div>
  );
};

export default DeckListing;
