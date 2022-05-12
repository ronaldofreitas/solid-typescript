/*
equivalente a 'models', mas as "entidades" não necessariamente representam tabelas de banco
*/
import { uuid } from "uuidv4";

export class User {
    
    public readonly id!: string;
    public name: string;
    public email: string;
    public password: string;

    constructor(props: Omit<User, "id">, id?: string) {
        //Object.assign(this, props)

        this.name = props.name;
        this.email = props.email;
        this.password = props.password;

        if(!id){
            // caso precise mudar de banco de dados algum dia... os IDs não estão atrelados ao banco antigo
            // não usar no banco o autoincrement ou algo semelhante
            this.id = uuid();
        }
    }
}