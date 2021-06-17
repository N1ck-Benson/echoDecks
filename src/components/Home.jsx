import { Typography, Divider, Button } from "@material-ui/core";
import { Link } from "@reach/router";
import "../styles/Home.css";

function Home() {
  return (
    <main>
      <section className="welcome-section">
        <Typography variant="h6" className="welcome-heading">
          Welcome to echoDecks!
          <br />
        </Typography>
        <Typography variant="body1" className="welcome-text">
          Hit start to begin generating flashcards and learning vocab more
          effectively.
        </Typography>
        <div className="Button">
          <Link to="add-deck" className="Link">
            <Button variant="contained" color="primary">
              Start
            </Button>
          </Link>
        </div>
      </section>
      <Divider className="Divider" />
      <section className="explainer-section">
        <Typography variant="h6" className="explainer-heading">
          How does it work?
        </Typography>
        <Typography variant="body2" className="explainer-text">
          Explainer...
        </Typography>
      </section>
    </main>
  );
}

export default Home;
