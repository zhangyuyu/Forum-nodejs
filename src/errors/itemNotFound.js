'use strict';

class ItemNotFound extends Error {
	constructor(message) {
	     super(message);
	     this.code = '404';
	     this.type = 'ItemNotFound';
	}
};

module.exports = ItemNotFound;
