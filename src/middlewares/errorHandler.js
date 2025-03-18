import createHttpError from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (createHttpError.isHttpError(error) === true) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  }
  console.error(error);
  res.status(404).json({
    status: 404,
    message: 'Contact not found',
    data: error.message,
  });
}
