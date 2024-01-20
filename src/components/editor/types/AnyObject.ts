export interface IObject<T> {
  [name: string]: T;
}

export type AnyObject<T = unknown> = unknown extends T ? IObject<any> : T;
