import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ){}

    async handle(request: Request, response: Response): Promise<Response | Error> {
        const { name, email, password } = request.body;

        try {
            await this.createUserUseCase.execute({
                name, email, password
            })

            return response.status(201).send('criado');
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || "Erro inesperado"
            })
        }
    }
}