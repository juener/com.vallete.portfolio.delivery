export class MaxTimeExceeded extends Error {
  constructor() {
    super('Max time is exceeded.');
  }
}
