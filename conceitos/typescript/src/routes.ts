import { Request, Response } from 'express';
import createUser from './services/CreateUser';


//string, number, boolean, object, Array
//interfaces
export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'ehrigoni@gmail.com.br',
        password: '123',
        techs: [
           'Node',
           'ReactJS',
           'ReactNative',
            { title: 'Javascript', experience:  100 },
        ],
    });
    return response.json({ message: 'Hello World' });
}