## Welcome to echoDecks!

(currently under development)

---

<img alt="echoDecks in action" src="https://i.postimg.cc/hjsrfMf3/Screenshot-2021-06-24-at-17-53-45.png" style="height: 300px; margin-left: 140px"/>

---

[What does it do?]()

[How does it work?]()

[How do I run the code?]()

### What does it do?

---

- If you're learning another language, you might be memorising new words in the traditional way (word > definition >
  repeat). If so, echoDecks is for you.

- We need to see a new word in different contexts to truly memorize
  it... not just the word on it's own!

- Give echoDecks a list of foreign-language words you want to learn, and
  the app will build a deck of flashcards for you

- For every word, echoDecks will try to find you 4-5 **REAL WORLD** examples...
  with translations!

### How does it work?

---

echoDecks' ability to generate real-world examples and translations for your vocab lists is powered by [Linguee](https://www.linguee.com/), with the indispensable help of Roman Imankulov's [proxy api](https://github.com/imankulov/linguee-api).

Besides these APIs, the backend techstack is a postgreSQL database receiving GraphQL queries mediated by Apollo. The frontend is all React, and is styled using Material-UI components.

### How do I run the code?

---

**Unfortunately I'm having issues with the app which make it tricky for others to run the code successfully. I'm working on fixes, but in the meantime cloning this repo is not recommended...**

The webapp is not deployed yet, so please do the following to get it running on your own machine:

1. Fork and/or clone this repo

2. Make sure you have Node and Yarn installed

3. Install the dependencies:

- In your terminal, navigate to `echodecks_web/src`, and run `yarn`
- Navigate to `echodecks_web/server` and do the same

3. Install a postgreSQL client and make a migration:

- I used [postgreSQL.app](https://postgresapp.com/) for Mac. Download any postgreSQL client and follow the instructions to have a postgreSQL database served locally on your machine.
- Once you're running postgreSQL on your machine, navigate to `echodecks_web/server/prisma/schema.prisma` in the echoDecks directory. You'll see the following code:
  `datasource db { provider = "postgresql" url = "postgresql://[USERNAME]@[PORT]/[DB_NAME]" }`

Replace the parts of the URL with the address of your postgreSQL database.

Now navigate to `echodecks_web/server`, and run `npx primsa generate` in your terminal. The database should be all set up!

4. Still in `echodecks_web/server`, run `node src/index.js`. This will run the Apollo server on localhost:4000.

5. Navigate to `echodecks_web/src` and run `yarn start`. This will trigger an optimized development build of the app, running on localhost:3000. For better performance, you can also run `yarn build` to launch a production build of the app and serve it locally.

6. **Important**: you'll need to download a CORS extension for your browser. I'd recommend [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) for Chrome, or [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) for Firefox. **In the extension's preferences, enable the extension either for all sites (not recommended) or specifically for the localhost port which is serving the React app (probably https://localhost:3000)**

This is a temporary fix for a problem with the backend, where CORS "access-control-allow-origin" errors are triggered by the proxy Linguee API under the hood. This will be fixed in later versions of the app!
