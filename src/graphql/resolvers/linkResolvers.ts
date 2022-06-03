import { ApolloError } from 'apollo-server';
import { Link } from '@prisma/client';
import {
  getLink,
  feed,
  postLink,
  deleteLink,
  updateLink,
} from '../../data/links/linkHandler';

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (): Promise<Link[]> => {
      const { message, status, links } = await feed();
      if (status === 'Error') {
        throw new ApolloError(message);
      }
      return links as Link[];
    },
    link: async (_: any, args: { id: string }): Promise<Link> => {
      const { message, status, link } = await getLink(args.id);
      if (status == 'Error') {
        throw new ApolloError(message);
      }
      return link as Link;
    },
  },
  Mutation: {
    post: async (
      _: any,
      args: { url: string; description: string }
    ): Promise<Link> => {
      const { message, status, link } = await postLink(args);
      if (status === 'Error') {
        throw new ApolloError(message);
      }
      return link as Link;
    },
    updateLink: async (
      _: any,
      args: { id: string; url: string; description: string }
    ): Promise<Link> => {
      const { message, status, link } = await updateLink(args);
      if (status === 'Error') {
        throw new ApolloError(message);
      }
      return link as Link;
    },
    deleteLink: async (_: any, args: { id: string }): Promise<Link> => {
      const { status, message, link } = await deleteLink(args);
      if (status === 'Error') {
        throw new ApolloError(message);
      }
      return link as Link;
    },
  },
};

export { resolvers };
