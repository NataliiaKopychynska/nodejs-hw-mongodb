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
import { auth } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const routes = express.Router();
const jsonParse = express.json();

routes.get('/contacts', auth, ctrWrapper(getContactsController));

routes.get(
  '/contacts/:contactId',
  auth,
  isValidId,
  jsonParse,
  ctrWrapper(getContactController),
);

routes.post(
  '/contacts',
  upload.single('photo'),
  auth,
  jsonParse,
  validateBody(contactSchema),
  ctrWrapper(postContactController),
);

routes.patch(
  '/contacts/:contactId',
  auth,
  isValidId,
  jsonParse,
  validateBody(updateContactSchema),
  ctrWrapper(patchContactController),
);
routes.delete(
  '/contacts/:contactId',
  auth,
  isValidId,
  ctrWrapper(deleteContactController),
);

export default routes;
