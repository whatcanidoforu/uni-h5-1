export interface Result<T = any> {
  body: T;
  code: string;
  message: string;
  subcode: string;
  submessage: string;
}
