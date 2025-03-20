import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d{1,3}[-.\s]?\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be in the format +1234567890123',
    }),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d{1,3}[-.\s]?\d{1,14}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be in the format +1234567890123',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
