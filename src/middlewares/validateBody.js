import createHttpError from 'http-errors';
export function validateBody(schema) {
  return async (req, _res, next) => {
    try {
      const result = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      console.log(result);
      next();
    } catch (error) {
      if (error.details) {
        const errors = error.details.map((detail) => detail.message);
        console.log(errors);
        next(new createHttpError.BadRequest(errors));
      } else {
        console.error('Validation error:', error.message);
        next(new createHttpError.BadRequest(error));
      }

      // const errors = error.details.map((detail) => detail.message);
      // console.log(errors);

      // //   next(new createHttpError.BadRequest(JSON.stringify(errors)));
      // next(new createHttpError.BadRequest(errors));
    }
  };
}
