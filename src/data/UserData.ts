import { IUserData } from "../model/interfaceUserData"
import User from "../model/User"
import { BaseDatabase } from "./BaseDatabase"

export default class UserData extends BaseDatabase implements IUserData {
    protected TABLE_NAME = "NOME_TABELAS_USUÁRIOS"

    insertUser = async (user: User): Promise<User> => {
        try {
            console.log(user)
            await this
                .connection(this.TABLE_NAME)
                .insert({
                    id: user.id,
                    name: user.name,
                    email:user.email,
                    password: user.password,
                    role: user.role                    
                })
                return user
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco !")
            }
        }
    }

    findByEmail = async (email: string):Promise<User> => {
        try {
            const queryResult = await this
                .connection(this.TABLE_NAME)
                .select()
                .where({ email })

            return queryResult[0]
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco !")
            }
        }
    }
}