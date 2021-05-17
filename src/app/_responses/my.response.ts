export class MyResponse<T> {
  constructor(
    public succeeded: boolean,
    public message: string,
    public error: [],
    public data: T
  ) {}
}