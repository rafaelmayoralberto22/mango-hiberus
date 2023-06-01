export class ErrorCorruptedData extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorCorruptedData";
  }
}
