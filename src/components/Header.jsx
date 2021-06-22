import React, { useState } from "react";
import { Link } from "@reach/router";
import { Typography, Button, Menu, MenuItem } from "@material-ui/core";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import "../styles/Header.css";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Button onClick={handleClick}>
        <ListRoundedIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className="Link" to="add-deck">
            Add Deck
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="Link" to="view-decks">
            View Decks
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="Link" to="/">
            Logout
          </Link>
        </MenuItem>
      </Menu>
      <Typography variant="h6">echoDEcks</Typography>
    </header>
  );
}

export default Header;
