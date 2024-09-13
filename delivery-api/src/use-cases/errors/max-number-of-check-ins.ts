export class MaxNumberOfCheckIns extends Error {
  constructor() {
    super('Max number of check-ins has been reached.');
  }
}
