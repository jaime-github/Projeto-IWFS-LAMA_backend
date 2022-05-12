export type authenticationData = {
    id: string
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
 } 

export default class User{
     public get role(): USER_ROLES {
        return this._role
    }
    public set role(value: USER_ROLES) {
        this._role = value
    }
    public get password(): string {
        return this._password
    }
    public set password(value: string) {
        this._password = value
    }
    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    
    constructor(
        private _id: string,
        private _name: string,
        private _email: string,
        private _password: string,
        private _role?: USER_ROLES
    ){}
}

