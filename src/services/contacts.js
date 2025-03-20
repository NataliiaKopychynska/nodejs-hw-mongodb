import Contact from '../models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(),
    Contact.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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
