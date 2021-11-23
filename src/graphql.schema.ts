
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
  username?: Nullable<string>;
  email?: Nullable<string>;
  password?: Nullable<string>;
}

export abstract class IQuery {
  abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

// export abstract class IMutation {
//     abstract createUser(createUserInput?: Nullable<createUserInput>): Nullable<User> | Promise<Nullable<User>>;
// }

export abstract class ISubscription {
  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  id?: Nullable<string>;
  username?: Nullable<string>;
  email?: Nullable<string>;
}

type Nullable<T> = T | null;
