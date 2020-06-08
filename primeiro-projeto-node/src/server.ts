import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello Rigoni Family' });
});

app.listen(3333, () => {
    console.log('Backend running on port 3333!');
})
