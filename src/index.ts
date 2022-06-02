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
    link: (_: any, args: { id: string }): Link => {
      return links.filter(link => link.id == args.id)[0];
    },
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
    updateLink: (
      _: any,
      args: { id: string; url: string; description: string }
    ): Link | string => {
      let updateIndex = -1;
      for (let i = 0; i < links.length; i++) {
        if (links[i].id == args.id) {
          updateIndex = i;
          break;
        }
      }
      if (updateIndex == -1) {
        return `Link not found for id: ${args.id}`;
      }
      links[updateIndex].url = args.url;
      links[updateIndex].description = args.description;
      return links[updateIndex];
    },
    deleteLink: (_: any, args: { id: string }): Link | String => {
      let deleteIndex = -1;
      for (let i = 0; i < links.length; i++) {
        if (links[i].id == args.id) {
          return links.splice(i, 1)[0];
        }
      }
      return `Link not found for id: ${args.id}`;
    },
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
