const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
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
    // Get deck by id
    deckById: async (parents, args, context) => {
      return context.prisma.deck.findMany({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    // Create a new deck
    post: async (parent, args, context) => {
      const newDeck = context.prisma.deck.create({
        data: {
          title: args.title,
          lemmas: args.lemmas,
          flashcards: args.flashcards,
          src: args.src,
          dst: args.dst,
        },
      });
      return newDeck;
    },
    // Mark isLearned as true or false for a deck
    updateDeck: async (parents, args, context) => {
      const updatedDeck = await context.prisma.deck.update({
        where: {
          id: args.id,
        },
        data: {
          isLearned: args.isLearned,
        },
      });
      return updatedDeck;
    },
    // Mark isLearned as true or false for an individual flashcard
    updateFlashcards: async (parents, args, context) => {
      const updatedFlashcards = await context.prisma.deck.update({
        where: {
          id: args.id,
        },
        data: {
          flashcards: args.flashcards,
        },
      });
      return updatedFlashcards;
    },
    // Delete a deck
    delete: async (parents, args, context) => {
      const deletedDeck = await context.prisma.deck.delete({
        where: {
          id: args.id,
        },
      });
      return deletedDeck;
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
