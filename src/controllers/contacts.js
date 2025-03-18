import {
  getAllContacts,
  getContactById,
  postContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact === null) {
    // return res.status(404).json({
    //   message: 'Contact not found',
    // });
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function postContactController(req, res) {
  console.log(req.body);
  const contact = req.body;
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

  const result = await patchContact(contactId, contact);
  console.log(result);

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
  const result = await deleteContact(contactId);
  console.log(result);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
}
