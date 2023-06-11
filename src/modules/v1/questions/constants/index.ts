export enum QUESTION_STATUS {
  VERIFIED = 1,
  PENDING = 2,
  DRAFT = 3,
}

export enum QUESTION_TYPE {
  SINGLE_CHOICE = 1,
  MULTIPLE_CHOICE,
  TEXT,
}

export const DEFAULT_LIMIT = 10;

export enum USER_ROLE {
  ADMIN = 1,
  USER = 2,
}
