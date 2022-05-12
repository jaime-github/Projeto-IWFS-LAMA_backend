import User from "./User"

export interface IUserData{
    findByEmail(email: string):Promise<User>
    insertUser(user:User):Promise<User>
}
