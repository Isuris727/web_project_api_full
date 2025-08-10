class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export { ValidationError, AuthError, NotFoundError };
