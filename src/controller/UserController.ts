import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req: Request, res: Response) =>{
        const {name, email, password} = req.body;

        const input: SignupInputDTO ={
            name,
            email,
            password,            
        }
        try {
            console.log(1)
            const token = await this.userBusiness.signup(input)
            console.log(2)
            res.status(201).send({message: "Usuário cadastrado com sucesso", token})
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }
    }

    login = async(req: Request, res: Response) =>{
        const {name, email, password} = req.body

        const input: SignupInputDTO ={
            name,
            email,
            password,            
        }    
        try{
            const token = await this.userBusiness.login(input)
            res.status(201).send({message: "Usuário logado com sucesso", token})
            

        }catch (error){
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no login")
        }
    }
}