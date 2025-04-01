import Contact from '../models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments({ userId }),
    Contact.find({ userId })
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
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const postContact = async (contact) => {
  return Contact.create(contact);
};

export const patchContact = async (contactId, contact, userId, photo) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId, photo },
    { $set: contact },
    { new: true },
  );
  if (!updatedContact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
