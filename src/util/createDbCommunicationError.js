const DbCommunicationError = require('../errors/dbCommunicationError.js');

const createDbCommunicationError = (err, next) => {
    if(err) {
        const code = err.name === "ValidationError"? 400: 500;
        return next(new DbCommunicationError(`Communication with blog db error: ${err}`, code));
    }
};

module.exports = createDbCommunicationError;