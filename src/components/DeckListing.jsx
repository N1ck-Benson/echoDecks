import { Paper } from "@material-ui/core";

const DeckListing = (props) => {
  const { title, createdAt, src, dst, isLearned, key } = props;

  return (
    <div className="card-stack">
      <Paper className="top-card" elevation={3}>
        {title}
      </Paper>
      <Paper className="middle-card" elevation={3}></Paper>
      <Paper className="bottom-card" elevation={3}></Paper>
      <span></span>
    </div>
  );
};

export default DeckListing;
