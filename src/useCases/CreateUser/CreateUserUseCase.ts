import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDto";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,// contratos
        private mailProvider: IMailProvider
    ) {

    }

    async execute(data: ICreateUserRequestDTO) {
        const userExists = await this.usersRepository.findByEmail(data.email);

        if(userExists){
            throw new Error('Usário já existe');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: data.name,
                email: data.email
            },
            subject: 'olá, seja bem vindo',
            body: '<p>seja bem vindo</p>'
        })
    }
}

/*
S = single reposability
a classe CreateUserUseCase tem uma unica responsabilidade que é criar usuário
além disso ela não verifica se foi gravado em um arquivo, banco de dados etc
o importante é que ela crie um novo usuário


no constructor:

L = liskov substitution
D = depency inversion = não depende da implementação direta e sim da abstração, da interface

o CreateUserUseCase não sabe com qual repositorio está falando, não importa saber
assim poderá ser possível substituir um Mysql por um Postgres futuramente
*/