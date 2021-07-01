import { Paper, MenuItem, Menu } from "@material-ui/core";
import { CheckCircleOutline, MoreHoriz } from "@material-ui/icons";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useState } from "react";
import { Link } from "@reach/router";
import { gql, useMutation } from "@apollo/client";
import "../styles/ViewDecks.css";

// Note: src and dst are included on props for future inclusion,
// either as flag icons or just a verbal caption.
const DeckListing = (props) => {
  const { id, title, createdAt, src, dst, isLearned } = props;
  const date = new Date(parseInt(createdAt)).toLocaleDateString();
  const [isDeleted, setIsDeleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const DELETE_MUTATION = gql`
    mutation deleteById {
      delete (id: ${id}) {
        title
      }
    }
  `;

  const [deleteById, { loading }] = useMutation(DELETE_MUTATION);

  // Note: schema is written for this, just need to write a useMutation() here.
  const handleDelete = () => {
    deleteById(id).then(() => {
      setIsDeleted(true);
    });
  };

  return (
    <div className="view-card-stack">
      {!isDeleted ? (
        <Paper className="view-top-card" elevation={3}>
          <p className="deck-title">
            {title}&nbsp;
            <CheckCircleOutline
              color={isLearned ? "primary" : "disabled"}
              fontSize="small"
            />
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="button-wrapper"
          >
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
                onClick={handleDelete}
              >
                Delete Deck
              </button>
            </MenuItem>
          </Menu>
          <p className="deck-date">{date}</p>
        </Paper>
      ) : (
        <Paper className="view-top-card" elevation={3}>
          <p className="deck-title">{title} was deleted</p>
          <CancelOutlinedIcon />
        </Paper>
      )}
      <Paper className="view-middle-card" elevation={5}></Paper>
      <Paper className="view-bottom-card" elevation={3}></Paper>
      <span className="view-card-pocket"></span>
    </div>
  );
};

export default DeckListing;
