import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { contactId } = req.params;

  if (isValidObjectId(contactId) !== true) {
    return next(new createHttpError.BadRequest('Id is not valid'));
  }
  next();
}
