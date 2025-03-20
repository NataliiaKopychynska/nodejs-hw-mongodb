import express from 'express';
import { ctrWrapper } from '../utils/ctrlWrapper.js';
import {
  postContactController,
  getContactsController,
  getContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactSchema,
  updateContactSchema,
} from '../validation/contactSchema.js';

const routes = express.Router();
const jsonParse = express.json();

routes.get('/contacts', ctrWrapper(getContactsController));

routes.get(
  '/contacts/:contactId',
  isValidId,
  jsonParse,
  ctrWrapper(getContactController),
);

routes.post(
  '/contacts',
  jsonParse,
  validateBody(contactSchema),
  ctrWrapper(postContactController),
);

routes.patch(
  '/contacts/:contactId',
  isValidId,
  jsonParse,
  validateBody(updateContactSchema),
  ctrWrapper(patchContactController),
);
routes.delete(
  '/contacts/:contactId',
  isValidId,
  ctrWrapper(deleteContactController),
);

export default routes;
