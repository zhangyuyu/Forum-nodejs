const DbCommunicationError = require('../errors/dbCommunicationError.js');

const createDbCommunicationError = (err, next) => {
    if(err) {
        return next(new DbCommunicationError(`Communication with blog db error: ${err.message}`));
    }
};

module.exports = createDbCommunicationError;