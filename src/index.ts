import { ApolloServer } from 'apollo-server';

interface Link {
  id: string;
  url: string;
  description: string;
}

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
  Link: {
    id: (parent: any) => parent.id,
    description: (parent: any) => parent.description,
    url: (parent: any) => parent.url,
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
