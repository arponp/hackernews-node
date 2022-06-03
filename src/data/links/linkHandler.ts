import db from '../../db/db';
import { Link } from '@prisma/client';
import {
  CreateLinkData,
  DeleteLinkData,
  LinkReturn,
  LinksReturn,
  UpdateLinkData,
} from './linkTypes';

const feed = async (): Promise<LinksReturn> => {
  try {
    const links = await db.link.findMany();
    if (!links) {
      throw new Error(`No links found`);
    }
    return {
      message: 'Found links',
      status: 'Success',
      links,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      message: e.message,
      status: 'Error',
    };
  }
};

const getLink = async (id: string): Promise<LinkReturn> => {
  try {
    const link = (await db.link.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        createdAt: true,
        url: true,
        description: true,
      },
    })) as Link;
    if (!link) {
      throw new Error('Link could not be found for id: ' + id);
    }
    return {
      message: 'Found user',
      status: 'Success',
      link,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      status: 'Error',
      message: e.message,
    };
  }
};

const postLink = async (
  createLinkData: CreateLinkData
): Promise<LinkReturn> => {
  try {
    const link = (await db.link.create({
      data: {
        description: createLinkData.description,
        url: createLinkData.url,
      },
      select: {
        id: true,
        description: true,
        url: true,
        createdAt: true,
      },
    })) as Link;
    if (!link) {
      throw new Error('Link could not be created');
    }
    return {
      status: 'Success',
      message: 'Posted link',
      link,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      status: 'Error',
      message: e.message,
    };
  }
};

const updateLink = async (
  updateLinkData: UpdateLinkData
): Promise<LinkReturn> => {
  try {
    const link = (await db.link.update({
      where: {
        id: updateLinkData.id,
      },
      data: {
        url: updateLinkData.url,
        description: updateLinkData.description,
      },
      select: {
        id: true,
        url: true,
        description: true,
      },
    })) as Link;
    if (!link) {
      throw new Error('Link could not be updated');
    }
    return {
      status: 'Success',
      message: 'Link Updated',
      link,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      status: 'Error',
      message: e.message,
    };
  }
};

const deleteLink = async (
  deleteLinkData: DeleteLinkData
): Promise<LinkReturn> => {
  try {
    const link = await db.link.delete({ where: { id: deleteLinkData.id } });
    if (!link) {
      throw new Error('Link could not be deleted');
    }
    return {
      status: 'Success',
      message: 'Link deleted',
      link,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      status: 'Error',
      message: e.message,
    };
  }
};

export { feed, getLink, postLink, updateLink, deleteLink };
