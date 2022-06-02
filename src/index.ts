import { ApolloServer } from 'apollo-server';

const typeDefs = `
    type Query {
      info: String!
      feed: [Link!]!
    }
    type Link {
      id: ID!
      description: String!
      url: String!
    }
`;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await server.listen();
  console.log(`Server live on ${url}`);
})();
