import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';
import { resolvers } from './graphql/resolvers/linkResolvers';

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'graphql/schema.graphql'),
    'utf-8'
  ),
  resolvers,
});

(async () => {
  const { url } = await server.listen();
  console.log(`Server live on ${url}`);
})();
