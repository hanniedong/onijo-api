
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    phoneNumber?: Nullable<string>;
}

export class UpdateUserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class UpdateUsernameInput {
    id?: Nullable<string>;
    username?: Nullable<string>;
}

export class CreateUserProfileInput {
    userId?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class UpdateUserProfileInput {
    userId?: Nullable<string>;
    job?: Nullable<string>;
    company?: Nullable<string>;
    study?: Nullable<string>;
    education?: Nullable<string>;
    bio?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<createUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<updateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUsername(updateUsernameInput?: Nullable<updateUsernameInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createUserProfile(createUserProfileInput?: Nullable<createUserProfileInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUserProfile(updateUserProfileInput?: Nullable<updateUserProfileInput>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

type Nullable<T> = T | null;
