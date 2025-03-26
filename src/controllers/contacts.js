import {
  getAllContacts,
  getContactById,
  postContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsPaginationParams } from '../utils/parsPaginationParams.js';
import { parsSortParams } from '../utils/parsSortParams.js';
import { query } from 'express';

export async function getContactsController(req, res) {
  // console.log(req.user);

  const { page, perPage } = parsPaginationParams(req.query);
  const { sortBy, sortOrder } = parsSortParams(req.query);
  req, query;

  const response = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: response,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user.id);
  if (contact === null) {
    // return res.status(404).json({
    //   message: 'Contact not found',
    // });
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden('Contact is not allowed');
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function postContactController(req, res) {
  // console.log(req.body);
  const contact = { ...req.body, userId: req.user.id };
  const result = await postContact(contact);
  console.log('Created contact:', result);

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: result,
  });
}

export async function patchContactController(req, res) {
  const { contactId } = req.params;
  const contact = req.body;

  const result = await patchContact(contactId, contact, req.user.id);
  console.log(result);

  if (result.userId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden('Contact is not allowed');
    throw new createHttpError.NotFound('Contact not found');
  }

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const result = await deleteContact(contactId, req.user.id);
  console.log(result);

  if (result.userId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden('Contact is not allowed');
    throw new createHttpError.NotFound('Contact not found');
  }

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
}
