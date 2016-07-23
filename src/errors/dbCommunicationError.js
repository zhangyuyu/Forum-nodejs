'use strict'

class DbCommunicationError extends Error {
	constructor(message, code) {
	    super(message);
	    this.code = code;
	    this.type = 'DbCommunicationError';
	}
};

module.exports = DbCommunicationError;
