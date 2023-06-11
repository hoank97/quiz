import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

export interface IResponse<T> {
  statusCode: number;
  data: T;
  pagination?: IPagination;
}

export interface IPagination {
  total: number;
  currentPages: number;
  perPage: number;
}

export interface IExceptionFilter {
  statusCode: number;
  message: string | object;
}

export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  store(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}

export interface IPaginationOption {
  page?: number;
  limit?: number;
  offset: number;
}
