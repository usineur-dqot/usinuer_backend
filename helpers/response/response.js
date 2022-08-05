const codes = require('./httpStatusCodes');

module.exports = {
  successResponse: (res, message, data = undefined, responserCode = codes.OK) => {
    // if (isEmpty(data)) responserCode = codes.NoContent;

    res.status(responserCode).json({ message, data, responserCode });
  },
  errorResponse: (res, message,error, responserCode = codes.BadRequest) => {
    res.status(responserCode).json({ message, error, responserCode });
  },
};
