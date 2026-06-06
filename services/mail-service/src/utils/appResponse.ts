export class AppResponse<T> {
  statusCode: number;
  data?: T;
  message: string;

  constructor(message: string, data: T, statusCode: number) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
