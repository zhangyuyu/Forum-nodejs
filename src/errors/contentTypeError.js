 'use strict';

 class ContentTypeError extends Error {
 	constructor(message) {
	     super(message);
	     this.code = '400';
	     this.type = 'ContentTypeError';
	}
 }

module.exports = ContentTypeError;
