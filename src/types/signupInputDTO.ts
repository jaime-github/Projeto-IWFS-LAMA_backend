import { USER_ROLES } from "../model/User"

export type SignupInputDTO = {
    name: string
    email: string
    password: string
    role?: USER_ROLES
}

