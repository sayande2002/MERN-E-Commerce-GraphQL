class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = CustomError;

// ! Function to handle Error
