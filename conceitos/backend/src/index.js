const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());//dessa forma permite qualquer tipo de acesso.
//Mais adiante dá para configurar a origem da aplicação cliente.
app.use(express.json());
/**
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora de editar um recurso (JSON)
 */

 /**
  * Middleware:
  * 
  * Interceptador de requisições que pode interromper totalmente
  * a requisição ou alterar dados da requisição
  */
const projects = [];

function logRequests(request, response, next) {
   const { method, url } = request; 

   const logLabel = `[${method.toUpperCase()}] ${url}`;

   console.time(logLabel);

   next(); //chama o próximo middleware

   console.timeEnd(logLabel);

};

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' });
    };

    return next();
};

app.use(logRequests);
app.use('/projects/:id', validateProjectId);


app.get('/projects', (request, response) => {
    const { title } = request.query;
    
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner, techs } = request.body;
     
    const project = { id: uuid(), title, owner, techs };
    
    projects.push(project);
    
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    /*const params = request.params;
    console.log(params);
    */
    const { id } = request.params;
    const { title, owner, techs } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    };

    const project = {
        id,
        title,
        owner,
        techs,
    };

    projects[projectIndex] = project;

    return response.json();
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    };

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('BackEndStarted');
});