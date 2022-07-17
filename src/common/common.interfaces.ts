export enum ICommon {
    DATA_SOURCE = 'DATA_SOURCE',
    DATABASE = 'postgres',
    PHOTO_REPOSITORY = 'PHOTO_REPOSITORY',
    ROLE_REPOSITORY = 'ROLE_REPOSITORY'
}

export interface IUserExpress {
    role: string;
    sub: number;
    iat: number;
    exp: number;
}