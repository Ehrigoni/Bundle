/**
 * Para criar um usuário> name, email, password
 */

interface TechObject {
    title: string;
    experience: number;
}

interface CreateUserData {
    name?: string; //?: significa que o parâmetro nome é opcional.
    email:  string;
    password: string;
    techs: Array<string | TechObject>; //o campo techs pode ser um string ou um TechObject;
}

 export default function createUser({ name = '', email, password, }: CreateUserData) {
    const user = {
        name,
        email,
        password,
    }
    return user;
 }