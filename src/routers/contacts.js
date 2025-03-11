import express from 'express';
import { ctrWrapper } from '../utils/ctrlWrapper.js';
import {
  postContactController,
  getContactsController,
  getContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const routes = express.Router();
const jsonParse = express.json();

routes.get('/contacts', ctrWrapper(getContactsController));

routes.get('/contacts/:contactId', jsonParse, ctrWrapper(getContactController));

routes.post('/contacts', jsonParse, ctrWrapper(postContactController));

routes.patch(
  '/contacts/:contactId',
  jsonParse,
  ctrWrapper(patchContactController),
);
routes.delete('/contacts/:contactId', ctrWrapper(deleteContactController));

export default routes;
