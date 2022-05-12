import { IUserData } from "../model/interfaceUserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserBusiness{

        private userData:IUserData;
        private idGenerator:IdGenerator;
        private hashManager:HashManager;
        private authenticator:Authenticator;

    constructor(userDataRepository:IUserData){
        this.userData = userDataRepository
        this.idGenerator = new IdGenerator
        this.hashManager = new HashManager
        this.authenticator = new Authenticator
    }

    signup = async (input:SignupInputDTO) =>{
        //validacao
        const {name, email, password} = input
        if(!email || !name || !password ){
            throw new Error("Campos inválidos")
        }

        //conferir se o usuario existe
        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){
            throw new Error("Email já cadastrado")
        }

        //criar uma id pro usuario
        const id = this.idGenerator.generateId()

        //hashear o password
        const hashedPassword = await this.hashManager.hash(password)

        //criar o usuario no banco
        const user = new User(
            id,
            name,
            email,
            hashedPassword            
        )
        await this.userData.insertUser(user)
        //criar o token
        const token = this.authenticator.generateToken({id})
        //retornar o token
        return token
    }

    login = async (input:SignupInputDTO) => {
        const {email, password} = input

        if(!email || !password){
            throw new Error('Insira corretamente as Informações. Campos obrigatórios!')
        }
        //conferir se o usuario existe

        const registeredUser = await this.userData.findByEmail(email)
        if(!registeredUser){
            throw new Error("Email já cadastrado")
        }
        const hashManager = new HashManager()
        const passwordIsCorrect = await this.hashManager.compare(password, registeredUser.password)
        if(!passwordIsCorrect){
            throw new Error('Email ou senha incorretos.')
        }
        const authenticator = new Authenticator()
        const token = this.authenticator.generateToken({id: registeredUser.id})
        return token
    }
}