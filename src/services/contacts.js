import Contact from '../models/contact.js';

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
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: contact },
      { new: true },
    );
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact');
  }
};

export const deleteContact = async (contactId) => {
  return Student.findByIdAndDelete(contactId);
};
