import { Link } from '@prisma/client';

interface LinkReturn {
  status: string;
  message: string;
  link?: Link;
}

interface LinksReturn {
  status: string;
  message: string;
  links?: Link[];
}

interface CreateLinkData {
  url: string;
  description: string;
}

interface UpdateLinkData {
  id: string;
  url: string;
  description: string;
}

interface DeleteLinkData {
  id: string;
}

export {
  LinkReturn,
  LinksReturn,
  CreateLinkData,
  UpdateLinkData,
  DeleteLinkData,
};
