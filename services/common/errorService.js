/**
 * Error Entity
 */

class ErrorService {
    constructor(errorCode, message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}

module.exports = ErrorService;