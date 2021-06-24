import { Typography, Divider, Button } from "@material-ui/core";
import { Link } from "@reach/router";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home-main">
      <section className="welcome-section">
        <Typography variant="h6" className="welcome-heading">
          Welcome to echoDecks!
          <br />
        </Typography>
        <Typography variant="body1" className="welcome-text">
          Hit start to begin learning vocab more effectively with
          self-generating flashcards...
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
          Learning new words in the traditional way (word {">"} definition {">"}{" "}
          repeat)?
        </Typography>
        <br />
        <Typography variant="body2" className="explainer-text">
          We need to see a new word in different contexts to truly memorize
          it... not just the word on it's own!
        </Typography>
        <br />
        <Typography variant="body2" className="explainer-text">
          Give echoDecks a list of foreign-language words you want to learn, and
          the app will build a deck of flashcards for you
        </Typography>
        <br />
        <Typography variant="body2" className="explainer-text">
          For every word, echoDecks tries to give you 4-5 REAL WORLD examples...
          with translations!
        </Typography>
      </section>
    </main>
  );
}

export default Home;
