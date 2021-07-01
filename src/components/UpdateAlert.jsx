import React from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import "../styles/UpdateAlert.css";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "@reach/router";

const UpdateAlert = (props) => {
  const { id, setAlertOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const UNLEARN_DECK_MUTATION = gql`
      mutation unlearn {
        updateDeck(id: ${id}, isLearned: false){
          id
        }
      }
    `;

  const [unlearn] = useMutation(UNLEARN_DECK_MUTATION);

  const handleUnlearn = () => {
    setIsLoading(true);
    unlearn().then(() => {
      navigate(`/learn-deck/${id}`);
    });
  };

  if (isLoading)
    return (
      <div className="isLoading">
        <CircularProgress color="primary" />
      </div>
    );

  return (
    <div className="alert">
      <Typography variant="body2" color="primary">
        Mark this deck as "not learned"?
      </Typography>
      <div className="alert-button-group">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            setAlertOpen(false);
          }}
        >
          No
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="Button"
          onClick={handleUnlearn}
        >
          Yes!
        </Button>
      </div>
    </div>
  );
};

export default UpdateAlert;
