const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { flashcardBuilder } = require("./utils");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Implementation of the schema
const resolvers = {
  Query: {
    // Get users' decks
    decks: async (parent, args, context) => {
      return context.prisma.deck.findMany();
    },
  },
  Mutation: {
    // Create a new deck
    post: async (parent, args, context) => {
      // dummy lingueeData -> hit linguee api client-side
      const lingueeData = [
        {
          text: "bacalhau desfiado",
          pos: "m",
          audio_links: null,
          translations: [{ text: "shredded cod", pos: "noun" }],
        },
      ];
      const newFlashcards = flashcardBuilder(lingueeData);
      const jsonFlashcards = JSON.stringify(newFlashcards);
      const newDeck = context.prisma.deck.create({
        data: {
          lemmas: args.lemmas,
          flashcards: jsonFlashcards,
          src: args.src,
          dst: args.dst,
        },
      });
      return newDeck;
    },
  },
};

// Instantiation of the ApolloServer class
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

// Invocation of the server
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
