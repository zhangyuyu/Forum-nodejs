'use strict'

class DbCommunicationError extends Error {
	constructor(message) {
	    super(message);
	    this.code = '500';
	    this.type = 'DbCommunicationError';
	}
};

module.exports = DbCommunicationError;
