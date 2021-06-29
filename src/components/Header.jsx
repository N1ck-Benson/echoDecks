import React, { useState } from "react";
import { Link } from "@reach/router";
import { Button, Menu, MenuItem } from "@material-ui/core";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import "../styles/Header.css";

// Header component wraps all other components
function Header() {
  // Setup for collapsable menu (all screen-sizes)
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
      <img
        src="https://i.postimg.cc/fWtmFRb3/Screenshot-2021-06-24-at-17-03-05.png"
        className="logo"
      />
    </header>
  );
}

export default Header;
