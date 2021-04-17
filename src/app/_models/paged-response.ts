import { MyResponse } from "./my-response";

export class PagedResponse<T> extends MyResponse<T> {
  constructor(
    succeeded: boolean,
    message: string,
    error: [],
    data: T,
    public pageNumber: number,
    public pageSize: number,
    public totalPage: number,
    public totalRecords: number
  ) {
    super(succeeded, message, error, data);
  }
}