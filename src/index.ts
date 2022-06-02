import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';

interface Link {
  id: string;
  url: string;
  description: string;
}

const links: Link[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (_: any, args: { url: string; description: string }): Link => {
      let idCount = links.length;
      const link: Link = {
        id: `link-${idCount++}`,
        url: args.url,
        description: args.description,
      };
      links.push(link);
      return link;
    },
  },
  Link: {
    id: (parent: { id: string }) => parent.id,
    description: (parent: { description: string }) => parent.description,
    url: (parent: { url: string }) => parent.url,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
});

(async () => {
  const { url } = await server.listen();
  console.log(`Server live on ${url}`);
})();
