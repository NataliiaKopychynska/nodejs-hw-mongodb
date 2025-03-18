import Contact from '../models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const postContact = async (contact) => {
  return Contact.create(contact);
};

export const patchContact = async (contactId, contact) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: contact },
    { new: true },
  );
  if (!updatedContact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};
